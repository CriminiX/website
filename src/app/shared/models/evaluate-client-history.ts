import {EvaluateClient} from "./evaluate-client";

export interface EvaluateClientHistory extends EvaluateClient {
    date: Date
}

export type EvaluateClientHistoryModel = EvaluateClientHistory | undefined;