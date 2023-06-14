import {EvaluateClient} from "../models/evaluate-client";
import {EvaluateClientForm} from "../models/evaluate-client-form";

export const toEvaluateClient = (evaluateClientForm: EvaluateClientForm): EvaluateClient => {
    return {
        location: {
            city: evaluateClientForm.city.trim().removeAccents().toLowerCase().formatSaintName(),
            neighborhood: evaluateClientForm.neighborhood.trim().removeAccents().toLowerCase().formatSaintName()
        },
        shift: '',
        period: {
            begin: '',
            end: ''
        }
    };
}