import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEvaluateDialogComponent } from './history-evaluate-dialog.component';

describe('HistoryEvaluateDialogComponent', () => {
  let component: HistoryEvaluateDialogComponent;
  let fixture: ComponentFixture<HistoryEvaluateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryEvaluateDialogComponent]
    });
    fixture = TestBed.createComponent(HistoryEvaluateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
