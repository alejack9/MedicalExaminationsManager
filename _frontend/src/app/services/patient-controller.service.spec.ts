import { TestBed } from '@angular/core/testing';

import { PatientControllerService } from './patient-controller.service';

describe('PatientControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PatientControllerService = TestBed.get(PatientControllerService);
    expect(service).toBeTruthy();
  });
});
