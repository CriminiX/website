import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-feedback-evaluate-dialog',
  templateUrl: './feedback-evaluate-dialog.component.html',
  styleUrls: ['./feedback-evaluate-dialog.component.scss']
})
export class FeedbackEvaluateDialogComponent implements OnInit {

  feedbackForm!: FormGroup;
  locations!: {score: number; city: string; neighborhood: string}[]; // TODO: criar arquivo para passar ao dialog

  constructor(
      private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      feedbackScore: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', [Validators.max(300)]]
    });

    // TODO: atualizar feedbackScore para usar 'Button-toggles with forms'

    // TODO: Obter dados das localizacoes
    this.locations = [
      {score: 300, city: 's.paulo', neighborhood: 'brooklin'},
      {score: 600, city: 'jundiai', neighborhood: 'centro'},
      {score: 600, city: 'jundiai', neighborhood: 'centro'},
      {score: 600, city: 'jundiai', neighborhood: 'centro'}
    ];
  }

  sendFeedback() {
    // TODO: Se comunicar com API para envio das analises
  }
}
