import { TestBed } from '@angular/core/testing';

import { OutputVisibilityService } from './output-visibility.service';

describe('OutputVisibilityService', () => {
  let service: OutputVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
