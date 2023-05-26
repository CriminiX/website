import {EvaluateClient} from "./evaluate-client";

export interface EvaluateClientHistory extends EvaluateClient {
    id: string;
    date: Date
}

export type EvaluateClientHistoryModel = EvaluateClientHistory | undefined;