import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CityGeocoderApiService } from './city-geocoder-api.service';
import { ENV } from '@app/core';
import { stringify } from 'qs';
import { CityGeocoderResponse } from '../../interfaces/city.interface';
import { provideHttpClient } from '@angular/common/http';

describe('CityGeocoderApiService', () => {
  let service: CityGeocoderApiService;
  let httpMock: HttpTestingController;
  const mockEnv = {
    openWeatherApiKey: 'test-api-key',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CityGeocoderApiService,
        {
          provide: ENV,
          useValue: mockEnv,
        },
      ],
    });

    service = TestBed.inject(CityGeocoderApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('find', () => {
    it('should make GET request with correct URL and parameters', () => {
      const cityName = 'London';
      const mockResponse: CityGeocoderResponse = {
        cod: '200',
        message: 'success',
        count: 1,
        list: [],
      };

      service.find(cityName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const expectedUrl = `/api/data/2.5/find?${stringify({
        q: cityName,
        appid: mockEnv.openWeatherApiKey,
      })}`;

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
