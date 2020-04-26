import { TestBed } from '@angular/core/testing';

import { RecentObitsService } from './recent-obits.service';

describe('RecentObitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentObitsService = TestBed.get(RecentObitsService);
    expect(service).toBeTruthy();
  });
});
