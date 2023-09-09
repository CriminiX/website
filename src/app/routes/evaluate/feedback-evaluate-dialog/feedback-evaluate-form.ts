import {FormControl} from "@angular/forms";

export interface FeedbackEvaluateForm {
    feedbackScore: number;
    suggestionScores: SuggestionScoreFeedbackEvaluateForm[];
    comments?: string;
}

export interface SuggestionScoreFeedbackEvaluateForm {
    suggestionScore: number;
}