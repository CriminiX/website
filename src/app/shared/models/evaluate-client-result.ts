export interface EvaluateClientResult {
    records: EvaluateClientRecordResult[];
    axes: any;
}

export interface EvaluateClientRecordResult {
    location: EvaluateClientRecordLocationResult;
    day: string;
    shift: string;
    season: string;
    score: number;
}

export interface EvaluateClientRecordLocationResult {
    city: string;
    neighborhood: string;
    street: any;
}

export type EvaluateClientResultModel = EvaluateClientResult | undefined;