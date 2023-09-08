import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEvaluateDialogComponent } from './feedback-evaluate-dialog.component';

describe('FeedbackEvaluateDialogComponent', () => {
  let component: FeedbackEvaluateDialogComponent;
  let fixture: ComponentFixture<FeedbackEvaluateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackEvaluateDialogComponent]
    });
    fixture = TestBed.createComponent(FeedbackEvaluateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
