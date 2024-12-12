import { TestBed } from '@angular/core/testing';

import { CityGeocoderApiService } from './city-geocoder-api.service';

describe('GeocoderService', () => {
  let service: CityGeocoderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityGeocoderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
