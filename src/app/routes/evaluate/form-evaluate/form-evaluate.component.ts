import {Component, Input, OnInit} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormGroupDirective,
    Validators,
} from "@angular/forms";
import {v4 as uuid} from "uuid";
import {Router} from "@angular/router";
import {EvaluateClientResult} from "src/app/shared/models/evaluate-client-result";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateService} from "src/app/shared/services/evaluate/evaluate.service";
import {ToastService} from "src/app/shared/services/toast/toast.service";
import {EvaluateClient, EvaluateClientModel} from "../../../shared/models/evaluate-client";
import {MatDialog} from "@angular/material/dialog";
import {HistoryEvaluateDialogComponent} from "../history-evaluate-dialog/history-evaluate-dialog.component";
import {EvaluateClientHistory, EvaluateClientHistoryModel} from "../../../shared/models/evaluate-client-history";
import '../../../shared/extensions/date.extensions';

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
            name: ["", [Validators.required, Validators.minLength(2)]],
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
        this.evaluateForm.controls["name"].setValue(data.name);
        this.evaluateForm.controls["month"].setValue(data.month);
    }

    evaluate() {
        this.loading = true;

        const evaluateClient = this.evaluateForm.getRawValue() as EvaluateClient;
        this.cacheService.saveOnList<EvaluateClientHistory>("evaluate-history", {...evaluateClient, id: uuid(), date: new Date()});

        this.evaluateService.evaluateClient(evaluateClient).subscribe({
            next: async (value) => {
                this.cacheService.save<EvaluateClient>("evaluate-form", evaluateClient);
                this.cacheService.save<EvaluateClientResult>("evaluate", value);
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

                this.setFormData(value);
            }
        })
    }
}
