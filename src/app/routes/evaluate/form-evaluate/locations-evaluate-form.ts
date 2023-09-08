import {FormControl} from "@angular/forms";

export interface LocationsEvaluateForm {
    cep: FormControl<string | null>;
    city: FormControl<string | null>;
    neighborhood: FormControl<string | null>;
}