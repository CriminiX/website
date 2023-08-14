import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsFormEvaluateComponent } from './locations-form-evaluate.component';

describe('LocationsFormEvaluateComponent', () => {
  let component: LocationsFormEvaluateComponent;
  let fixture: ComponentFixture<LocationsFormEvaluateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsFormEvaluateComponent]
    });
    fixture = TestBed.createComponent(LocationsFormEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
