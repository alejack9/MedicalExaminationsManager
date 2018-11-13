import { TestBed } from '@angular/core/testing';

import { ViewerGetterService } from './viewer-getter.service';

describe('ViewerGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewerGetterService = TestBed.get(ViewerGetterService);
    expect(service).toBeTruthy();
  });
});
