import {Component, Input, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    Validators,
} from "@angular/forms";
import {v4 as uuid} from "uuid";
import {Router} from "@angular/router";
import {EvaluateClientRecordResult} from "src/app/shared/models/evaluate-client-result";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateService} from "src/app/shared/services/evaluate/evaluate.service";
import {ToastService} from "src/app/shared/services/toast/toast.service";
import {EvaluateClient} from "../../../shared/models/evaluate-client";
import {MatDialog} from "@angular/material/dialog";
import {HistoryEvaluateDialogComponent} from "../history-evaluate-dialog/history-evaluate-dialog.component";
import {EvaluateClientHistory, EvaluateClientHistoryModel} from "../../../shared/models/evaluate-client-history";
import '../../../shared/extensions/date.extensions';
import {EvaluateClientForm} from "../../../shared/models/evaluate-client-form";
import {toEvaluateClient} from "../../../shared/adapters/evaluate-client";
import {parse} from "date-fns";

@Component({
    selector: "app-form-evaluate",
    templateUrl: "./form-evaluate.component.html",
    styleUrls: ["./form-evaluate.component.scss"],
})
export class FormEvaluateComponent implements OnInit {
    evaluateForm!: FormGroup;
    loading = false;

    months!: { id: number; name: string; }[];

    @Input() formResult: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private router: Router,
        private evaluateService: EvaluateService,
        private cacheService: CacheService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.months = new Date().getMonthsNames();

        this.evaluateForm = this.formBuilder.group({
            city: ["", [Validators.required, Validators.minLength(2)]],
            neighborhood: ["", [Validators.required, Validators.minLength(2)]],
            hour: [12, [Validators.required, Validators.min(0), Validators.max(23)]],
            month: [null, [Validators.required]],
        });

        if (this.formResult) {
            this.setCachedData();
        }
    }

    private setCachedData() {
        const data = this.cacheService.get<EvaluateClient>("evaluate-form");

        if (!data) {
            return;
        }

        this.setFormData(data);
    }

    private setFormData(data: EvaluateClient) {
        this.evaluateForm.controls["city"].setValue(data.location.city);
        this.evaluateForm.controls["neighborhood"].setValue(data.location.neighborhood);
        this.evaluateForm.controls["hour"].setValue(data.hour);
        this.evaluateForm.controls["month"].setValue(parse(data.period.begin, "yyyy-MM-dd", new Date()).getMonth() + 1);
    }

    evaluate() {
        this.loading = true;

        const evaluateClientForm = this.evaluateForm.getRawValue() as EvaluateClientForm;
        this.cacheService.saveOnList<EvaluateClientHistory>("evaluate-history", {...evaluateClientForm, id: uuid(), date: new Date()});
        const evaluateClient: EvaluateClient = toEvaluateClient(evaluateClientForm);

        this.evaluateService.evaluateClient(evaluateClient).subscribe({
            next: async (value) => {
                this.cacheService.save<EvaluateClient>("evaluate-form", evaluateClient);
                this.cacheService.save<EvaluateClientRecordResult[]>("evaluate", value);
                await this.router.navigateByUrl("/evaluate/result");
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                this.toastService.show("Erro ao Simular Cliente.");
                this.loading = false;
            }
        });
    }

    openHistoryDialog() {
        const historyDialog = this.dialog.open<HistoryEvaluateDialogComponent, undefined, EvaluateClientHistoryModel>(HistoryEvaluateDialogComponent, {
            panelClass: 'dialog-container'
        });
        historyDialog.afterClosed().subscribe({
            next: value => {
                if (!value) {
                    return;
                }

                const evaluateClient: EvaluateClient = toEvaluateClient(value);
                this.setFormData(evaluateClient);
            }
        })
    }
}
