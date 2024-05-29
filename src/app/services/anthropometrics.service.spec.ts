import { TestBed } from '@angular/core/testing';

import { AnthropometricsService } from './anthropometrics.service';

describe('AnthropometricsService', () => {
  let service: AnthropometricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnthropometricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
