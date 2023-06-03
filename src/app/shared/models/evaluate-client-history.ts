import {EvaluateClientForm} from "./evaluate-client-form";

export interface EvaluateClientHistory extends EvaluateClientForm {
    id: string;
    date: Date
}

export type EvaluateClientHistoryModel = EvaluateClientHistory | undefined;