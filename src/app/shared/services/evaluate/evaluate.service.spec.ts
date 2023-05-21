import { TestBed } from '@angular/core/testing';

import { EvaluateService } from './evaluate.service';

describe('EvaluateService', () => {
  let service: EvaluateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
