import { TestBed } from '@angular/core/testing';

import { CriminixIdService } from './criminix-id.service';

describe('CriminixIdService', () => {
  let service: CriminixIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriminixIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
