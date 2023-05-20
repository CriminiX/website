import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidestartComponent } from './guidestart.component';

describe('GuidestartComponent', () => {
  let component: GuidestartComponent;
  let fixture: ComponentFixture<GuidestartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidestartComponent]
    });
    fixture = TestBed.createComponent(GuidestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
