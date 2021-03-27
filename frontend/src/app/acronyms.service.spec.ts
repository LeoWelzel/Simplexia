import { TestBed } from '@angular/core/testing';

import { AcronymsService } from './acronyms.service';

describe('AcronymsService', () => {
  let service: AcronymsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcronymsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
