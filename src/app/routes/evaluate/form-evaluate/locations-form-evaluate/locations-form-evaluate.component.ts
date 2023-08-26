import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {LocationsEvaluateForm} from "../locations-evaluate-form";
import {LocationService} from "../../../../shared/services/location/location.service";
import {debounceTime, distinctUntilChanged, filter, map, tap} from "rxjs";
import {valueSelected} from "../../../../shared/validators/filter.validators";

@Component({
    selector: 'app-locations-form-evaluate',
    templateUrl: './locations-form-evaluate.component.html',
    styleUrls: ['./locations-form-evaluate.component.scss']
})
export class LocationsFormEvaluateComponent implements OnInit {

    @Input() locationsEvaluateForm!: FormGroup<LocationsEvaluateForm>;
    @Input() locationsCount!: number;
    @Input() locationsIndex!: number;
    @Output() formMessage = new EventEmitter<string>();

    filteredCities: string[] = [];
    filteredNeighborhoods: string[] = [];

    loadingCep = false;
    loadingCity = false;
    loadingNeighborhood = false;

    constructor(private locationService: LocationService) {
    }

    private resetNeighborhood() {
        this.locationsEvaluateForm.controls.neighborhood.setValue('');
        this.filteredNeighborhoods = [];
        if (this.locationsEvaluateForm.controls.city.valid) {
            this.locationsEvaluateForm.controls.neighborhood.enable();
        } else {
            this.locationsEvaluateForm.controls.neighborhood.disable();
        }
    }

    private resetLocationOnCepValue(cep?: string) {
        const cepLength = (cep?.length || 0);

        if (cepLength > 0) {
            this.locationsEvaluateForm.controls.city.disable();
            this.locationsEvaluateForm.controls.neighborhood.disable();
        } else if (cepLength == 0) {
            this.locationsEvaluateForm.controls.city.enable();
            this.locationsEvaluateForm.controls.neighborhood.disable();
        }

        if (cepLength > 0 && cepLength < 8) {
            this.locationsEvaluateForm.controls.city.setValue("");
            this.filteredCities = [];
            this.locationsEvaluateForm.controls.neighborhood.setValue("");
            this.filteredNeighborhoods = [];
        }
    }

    private hasCepValue() {
        return (this.locationsEvaluateForm.controls.cep.value?.length || 0) > 0;
    }

    ngOnInit(): void {
        if (this.locationsEvaluateForm.controls.city.invalid) {
            this.locationsEvaluateForm.controls.neighborhood.disable();
        } else {
            this.filteredCities = [this.locationsEvaluateForm.controls.city.value!]
            this.filteredNeighborhoods = [this.locationsEvaluateForm.controls.neighborhood.value!]
        }

        this.locationsEvaluateForm.controls.city.addValidators(valueSelected<string>((v) =>
            this.filteredCities.some((y) => v === y)
        ));
        this.locationsEvaluateForm.controls.neighborhood.addValidators(valueSelected<string>((v) =>
            this.filteredNeighborhoods.some((y) => v === y)
        ));

        this.locationsEvaluateForm.controls.cep.valueChanges
            .pipe(
                map((x) => x ?? undefined),
                tap((x) => (this.resetLocationOnCepValue(x))),
                filter((x) => (x?.length || 0) == 8),
                tap(() => (this.loadingCep = true)),
                debounceTime(300)
            )
            .subscribe({
                next: (searchCep) => {
                    this.locationService.searchLocationByCep(searchCep).subscribe({
                        next: (location) => {

                            if (location === null || location.city === undefined || location.neighborhood === undefined) {
                                this.formMessage.emit("Não foi encontrado uma localização para este CEP.")
                            } else {
                                this.locationsEvaluateForm.controls.city.setValue(location.city);
                                this.locationsEvaluateForm.controls.neighborhood.setValue(location.neighborhood);
                            }

                            this.loadingCep = false;
                        },
                        error: err => {
                            this.loadingCep = false;

                            if (err.status === 0) {
                                this.formMessage.emit("Busca Indisponível. Tente novamente mais tarde.")
                                return;
                            }

                            console.error('ERROR: Searching cep');
                        },
                    });
                },
                error: () => {
                    console.error('ERROR: cep value changed');
                    this.loadingCity = false;
                },
            });

        this.locationsEvaluateForm.controls.city.valueChanges
            .pipe(
                filter(() => !this.hasCepValue()),
                tap(() => {
                    this.resetNeighborhood();
                }),
                map((x) => x?.trim()),
                filter((x) => (x?.length || 0) > 2),
                tap(() => (this.loadingCity = true)),
                debounceTime(300),
                distinctUntilChanged(
                    (prev, current) => {
                        if (prev?.toLowerCase() == current?.toLowerCase()) {
                            this.loadingCity = false;
                            return true;
                        }
                        return false;
                    }
                )
            )
            .subscribe({
                next: (searchCity) => {
                    this.locationService.searchCity(searchCity).subscribe({
                        next: (cities) => {
                            this.filteredCities = cities;
                            this.loadingCity = false;
                        },
                        error: err => {
                            this.loadingCity = false;

                            if (err.status === 0) {
                                this.formMessage.emit("Busca Indisponível. Tente novamente mais tarde.")
                                return;
                            }

                            console.error('ERROR: Searching city');
                        },
                    });
                },
                error: () => {
                    console.error('ERROR: city value changed');
                    this.loadingCity = false;
                },
            });

        this.locationsEvaluateForm.controls.neighborhood.valueChanges
            .pipe(
                filter(() => !this.hasCepValue()),
                map((x) => x?.trim()),
                filter((x) => (x?.length || 0) > 1),
                tap(() => (this.loadingNeighborhood = true)),
                debounceTime(300),
                distinctUntilChanged(
                    (prev, current) => {
                        if (prev?.toLowerCase() == current?.toLowerCase()) {
                            this.loadingNeighborhood = false;
                            return true;
                        }
                        return false;
                    }
                )
            )
            .subscribe({
                next: (searchNeighborhood) => {
                    this.locationService
                        .searchNeighborhood(this.locationsEvaluateForm.controls.city.value!, searchNeighborhood)
                        .subscribe({
                            next: (neighborhoods) => {
                                this.filteredNeighborhoods = neighborhoods;
                                this.loadingNeighborhood = false;
                            },
                            error: (err) => {
                                this.loadingNeighborhood = false;

                                if (err.status === 0) {
                                    this.formMessage.emit("Busca Indisponível. Tente novamente mais tarde.")
                                    return;
                                }

                                console.error('ERROR: Searching neighborhood');
                            },
                        });
                },
                error: () => {
                    console.error('ERROR: neighborhood value changed');
                    this.loadingNeighborhood = false;
                },
            });
    }

    searchCitySelected() {
        this.loadingCity = false;
    }

    searchNeighborhoodSelected() {
        this.loadingNeighborhood = false;
    }
}
