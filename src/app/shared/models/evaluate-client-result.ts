export interface EvaluateClientResult {
    id: number;
    value1: number;
    value2: number;
    value3: number;
    score: number;
    months: number[];
}

export type EvaluateClientResultModel = EvaluateClientResult | undefined;