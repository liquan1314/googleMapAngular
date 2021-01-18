import { TestBed } from '@angular/core/testing';

import { GetLocationDataService } from './get-location-data.service';

describe('GetLocationDataService', () => {
  let service: GetLocationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLocationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
