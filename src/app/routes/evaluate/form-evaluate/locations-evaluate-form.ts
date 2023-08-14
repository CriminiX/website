import {FormControl} from "@angular/forms";

export interface LocationsEvaluateForm {
    city: FormControl<string | null>;
    neighborhood: FormControl<string | null>;
}