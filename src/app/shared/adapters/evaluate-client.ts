import {EvaluateClient} from "../models/evaluate-client";
import {EvaluateClientForm} from "../models/evaluate-client-form";

export const toEvaluateClient = (evaluateClientForm: EvaluateClientForm): EvaluateClient[] => {
    const year = new Date().getFullYear();
    return  evaluateClientForm.locations.map(location => {
        return {
            location: {
                city: location.city.trim().removeAccents().toLowerCase(),
                neighborhood: location.neighborhood.trim().removeAccents().toLowerCase()
            },
            shift: '',
            period: {begin: `${year}-01-01`, end: `${year}-12-31`}
        };
    });
}

export const toEvaluateClientWithShift = (evaluateClient: EvaluateClient, shift: string): EvaluateClient => {
    return {
        ...evaluateClient,
        shift
    }
}