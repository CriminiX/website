import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {
    FormArray,
    FormBuilder,
    FormGroup,
    Validators,
} from "@angular/forms";
import {v4 as uuid} from "uuid";
import {Router} from "@angular/router";
import {EvaluateClientRecordResult} from "src/app/shared/models/evaluate-client-result";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateService} from "src/app/shared/services/evaluate/evaluate.service";
import {ToastService} from "src/app/shared/services/toast/toast.service";
import {MatDialog} from "@angular/material/dialog";
import {HistoryEvaluateDialogComponent} from "../history-evaluate-dialog/history-evaluate-dialog.component";
import {EvaluateClientHistory, EvaluateClientHistoryModel} from "../../../shared/models/evaluate-client-history";
import '../../../shared/extensions/date.extensions';
import {EvaluateClientForm} from "../../../shared/models/evaluate-client-form";
import {LocationsEvaluateForm} from "./locations-evaluate-form";

@Component({
    selector: "app-form-evaluate",
    templateUrl: "./form-evaluate.component.html",
    styleUrls: ["./form-evaluate.component.scss"],
})
export class FormEvaluateComponent implements OnInit {
    evaluateForm!: FormGroup;
    loading = false;

    @Input() loadCachedData: boolean = false;
    @Output() formResponse = new EventEmitter<EvaluateClientRecordResult[][]>();

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
        this.evaluateForm = this.formBuilder.group({
            locations: this.formBuilder.array([]),
        });
        this.addLocationEvaluate();

        if (this.loadCachedData) {
            this.setCachedData();
        }
    }

    get locations() {
        return this.evaluateForm.controls['locations'] as FormArray<FormGroup<LocationsEvaluateForm>>;
    }

    addLocationEvaluate() {
        const form = this.formBuilder.group({
            cep: ["", [Validators.minLength(8)]],
            city: ["", [Validators.required, Validators.minLength(2)]],
            neighborhood: ["", [Validators.required, Validators.minLength(2)]]
        });
        this.locations.push(form);
    }

    removeLocationEvaluate(index: number) {
        this.locations.removeAt(index);
    }

    private setCachedData() {
        const id = this.cacheService.get<string>("evaluate-form");
        const history = this.cacheService.get<EvaluateClientHistory[]>("evaluate-history");

        if (id === undefined || history?.length === 0) {
            return;
        }

        const data = history?.find(x => x.id === id);

        if (data === undefined) {
            return;
        }

        this.setFormData(data);
    }

    private setFormData(data: EvaluateClientHistory) {
        this.locations.clear();
        for (let i = 0; i < data.locations.length; i++) {
            this.addLocationEvaluate();
            this.locations.at(i).setValue({
                cep: data.locations[i].cep ?? null,
                city: data.locations[i].city, 
                neighborhood: data.locations[i].neighborhood
            });

            this.resetLocationOnCepValue(i, data.locations[i].cep);
        }
    }

    private resetLocationOnCepValue(locationIndex: number, cep?: string) {
        const cepLength = (cep?.length || 0);

        if (cepLength > 0) {
            this.locations.at(locationIndex).controls.city.disable();
            this.locations.at(locationIndex).controls.neighborhood.disable();
        }
    }

    evaluate() {
        this.loading = true;

        const evaluateClientForm = this.evaluateForm.getRawValue() as EvaluateClientForm;
        const id = uuid();

        this.cacheService.saveOnList<EvaluateClientHistory>("evaluate-history", {
            ...evaluateClientForm,
            id,
            date: new Date()
        });

        this.evaluateService.evaluateClientAllShifts(evaluateClientForm).subscribe({
            next: async (value) => {
                this.cacheService.save<string>("evaluate-form", id);
                this.cacheService.save<EvaluateClientRecordResult[][]>("evaluate", value);
                this.formResponse.emit(value);
                await this.router.navigateByUrl("/evaluate/result");
                this.loading = false;
            },
            error: (err) => {
                console.error(err);
                switch (err.status) {
                    case 0:
                        this.toastService.show("Serviço Indisponível. Tente novamente mais tarde.");
                        break;
                    case 400:
                        this.toastService.show("Dados incompletos ou incorretos. Tente novamente.");
                        break;
                    case 404:
                        this.toastService.show("Localização inválida ou indisponível.");
                        break;
                    default:
                        this.toastService.show("Erro ao Simular Cliente.");
                        break;
                }
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

    locationMessage(message: string) {
        this.toastService.show(message);
    }
}
