import { TestBed } from '@angular/core/testing';

import { SummariseService } from './summarise.service';

describe('SummariseService', () => {
  let service: SummariseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummariseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
