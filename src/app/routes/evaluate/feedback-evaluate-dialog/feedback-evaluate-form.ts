import {FormControl} from "@angular/forms";

export interface FeedbackEvaluateForm {
    feedbackScore: number;
    suggestionScores: SuggestionScoreFeedbackEvaluateForm[];
    insuranceWorker: boolean;
    comments?: string;
}

export interface SuggestionScoreFeedbackEvaluateForm {
    suggestionScore: number;
}