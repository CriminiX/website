import { AbstractControl, ValidatorFn } from '@angular/forms';

export function valueSelected<T>(exists: (value: T) => boolean): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        let selectboxValue = c.value;

        if (exists(selectboxValue)) {
            return null;
        } else {
            return { match: true };
        }
    };
}
