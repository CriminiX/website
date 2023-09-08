import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../shared/services/feedback/feedback.service";
import {FeedbackEvaluateForm} from "./feedback-evaluate-form";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackEvaluateDialogContent} from "./feedback-evaluate-dialog-content";
import {da} from "date-fns/locale";
import {Feedback} from "../../../shared/models/feedback";
import {SuggestionsScoresFeedbackEvaluateForm} from "./suggestions-scores-feedback-evaluate-form";

@Component({
  selector: 'app-feedback-evaluate-dialog',
  templateUrl: './feedback-evaluate-dialog.component.html',
  styleUrls: ['./feedback-evaluate-dialog.component.scss']
})
export class FeedbackEvaluateDialogComponent implements OnInit {

  loading = false;
  feedbackForm!: FormGroup;
  locations!: FeedbackEvaluateDialogContent[];
  suggestionScoresForm!: FormGroup<SuggestionsScoresFeedbackEvaluateForm>[];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: FeedbackEvaluateDialogContent[],
      private dialogRef: MatDialogRef<FeedbackEvaluateDialogComponent>,
      private formBuilder: FormBuilder,
      private toastService: ToastService,
      private feedbackService: FeedbackService
  ) {
  }

  ngOnInit(): void {
    this.locations = this.data;

    this.suggestionScoresForm = this.locations.map(x => this.formBuilder.group({
      suggestionScore: [0, [Validators.required, Validators.min(-500), Validators.max(500)]],
    }));

    this.feedbackForm = this.formBuilder.group({
      feedbackScore: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      suggestionScores: this.formBuilder.array(this.suggestionScoresForm),
      comments: ['', [Validators.max(300)]]
    });
  }

  sendFeedback() {
    this.loading = true;

    const feedbackForm = this.feedbackForm.getRawValue() as FeedbackEvaluateForm;
    console.log(feedbackForm);

    const feedback: Feedback = {
      scores: this.locations.map(x => x.score),
      cities: this.locations.map(x => x.city),
      neighborhoods: this.locations.map(x => x.neighborhood),
      satisfaction_rate: +feedbackForm.feedbackScore,
      suggestion_scores: feedbackForm.suggestionScores.map(x => x.suggestionScore),
      obversation: feedbackForm.comments ?? ""
    };

    this.feedbackService.sendFeedback(feedback).subscribe({
      next: () => {
        this.toastService.show("Feedback enviado com sucesso!");
        this.dialogRef.close(undefined);
        this.loading = false;
      },
      error: err => {
        console.error('ERROR: sending feedback');
        console.error(err);
        this.toastService.show("Tivemos um problema ao enviar seu feedback. Tente novamente mais tarde.");
        this.loading = false;
      }
    });
  }
}
