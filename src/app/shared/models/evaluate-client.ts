export interface EvaluateClient {
    location: EvaluateClientLocation;
    hour: number;
    period: EvaluateClientPeriod;
}

export interface EvaluateClientLocation {
    city: string;
    neighborhood: string;
}

export interface EvaluateClientPeriod {
    begin: string;
    end: string;
}

export type EvaluateClientModel = EvaluateClient | undefined;