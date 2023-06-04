import {EvaluateClient} from "../models/evaluate-client";
import {EvaluateClientForm} from "../models/evaluate-client-form";

export const toEvaluateClient = (evaluateClientForm: EvaluateClientForm): EvaluateClient => {
    const begin = new Date().getFirstDayOfMonth(evaluateClientForm.month);
    const end = new Date().getLastDayOfMonth(evaluateClientForm.month);

    return {
        location: {
            city: evaluateClientForm.city.trim().removeAccents().toLowerCase().formatSaintName(),
            neighborhood: evaluateClientForm.neighborhood.trim().removeAccents().toLowerCase().formatSaintName()
        },
        shift: evaluateClientForm.shift,
        period: {
            begin,
            end
        }
    };
}