import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../shared/services/feedback/feedback.service";
import {FeedbackEvaluateForm} from "./feedback-evaluate-form";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FeedbackEvaluateDialogContent} from "./feedback-evaluate-dialog-content";
import {da} from "date-fns/locale";
import {Feedback} from "../../../shared/models/feedback";
import {SuggestionsScoresFeedbackEvaluateForm} from "./suggestions-scores-feedback-evaluate-form";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-feedback-evaluate-dialog',
  templateUrl: './feedback-evaluate-dialog.component.html',
  styleUrls: ['./feedback-evaluate-dialog.component.scss']
})
export class FeedbackEvaluateDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  loading = false;
  feedbackForm!: FormGroup;
  locations!: FeedbackEvaluateDialogContent[];
  dataTable!: MatTableDataSource<FeedbackEvaluateDialogContent>;
  suggestionScoresForm!: FormGroup<SuggestionsScoresFeedbackEvaluateForm>[];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: FeedbackEvaluateDialogContent[],
      private dialogRef: MatDialogRef<FeedbackEvaluateDialogComponent>,
      private formBuilder: FormBuilder,
      private toastService: ToastService,
      private feedbackService: FeedbackService
  ) {
  }

  ngAfterViewInit() {
    this.dataTable.sort = this.sort;
  }

  ngOnInit(): void {
    this.locations = this.data.map((loc, index) => {
      return {indexLocation: index + 1, ...loc};
    });
    this.dataTable = new MatTableDataSource(this.locations);

    this.suggestionScoresForm = this.locations.map(x => this.formBuilder.group({
      suggestionScore: [0, [Validators.required, Validators.min(-500), Validators.max(500)]],
    }));

    this.feedbackForm = this.formBuilder.group({
      feedbackScore: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      insuranceWorker: [false, [Validators.required]],
      suggestionScores: this.formBuilder.array(this.suggestionScoresForm),
      comments: ['', [Validators.max(300)]]
    });
  }

  sendFeedback() {
    this.loading = true;

    const feedbackForm = this.feedbackForm.getRawValue() as FeedbackEvaluateForm;

    const feedback: Feedback = {
      scores: this.locations.map(x => x.score),
      cities: this.locations.map(x => x.city),
      neighborhoods: this.locations.map(x => x.neighborhood),
      satisfaction_rate: +feedbackForm.feedbackScore,
      is_work_insurance: +feedbackForm.insuranceWorker,
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
