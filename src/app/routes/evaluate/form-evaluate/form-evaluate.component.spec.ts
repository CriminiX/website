import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEvaluateDialogComponent } from './form-evaluate.component';

describe('FormEvaluateDialogComponent', () => {
  let component: FormEvaluateDialogComponent;
  let fixture: ComponentFixture<FormEvaluateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEvaluateDialogComponent]
    });
    fixture = TestBed.createComponent(FormEvaluateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
