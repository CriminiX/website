export interface EvaluateClientForm {
    locations: LocationsEvaluateClientForm[];
}

export interface LocationsEvaluateClientForm {
    cep?: string;
    city: string;
    neighborhood: string;
}