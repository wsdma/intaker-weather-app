import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { WeatherApiService } from './weather-api.service';
import { ENV } from '@app/core';
import { stringify } from 'qs';
import {
  CurrentWeatherDto,
  WeatherForecastDto,
} from '../../interfaces/weather.interface';
import { provideHttpClient } from '@angular/common/http';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpMock: HttpTestingController;
  const mockEnv = {
    openWeatherApiKey: 'test-api-key',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherApiService,
        {
          provide: ENV,
          useValue: mockEnv,
        },
      ],
    });

    service = TestBed.inject(WeatherApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCurrentCityWeatherData', () => {
    const lat = 51.5074;
    const lon = -0.1278;

    it('should make GET request with correct URL and parameters', () => {
      const mockResponse: CurrentWeatherDto = {
        sys: {
          country: '',
          id: 0,
          message: 0,
          sunrise: 0,
          sunset: 0,
          type: 0,
        },
        base: '',
        cod: 0,
        timezone: 0,
        clouds: { all: 0 },
        id: 0,
        dt: 0,
        visibility: 0,
        rain: { '1h': 0 },
        snow: { '1h': 0 },
        wind: { speed: 0, deg: 0, gust: 0 },
        coord: { lat, lon },
        weather: [
          {
            id: 0,
            main: '',
            description: '',
            icon: '',
          },
        ],
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
          grnd_level: 0,
          sea_level: 0,
        },
        name: '',
      };

      service.getCurrentCityWeatherData(lat, lon).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const expectedUrl = `/api/data/2.5/weather?${stringify({
        lat,
        lon,
        appid: mockEnv.openWeatherApiKey,
        units: 'metric',
      })}`;

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getCityWeatherForecast', () => {
    const lat = 40.7128;
    const lon = -74.006;

    it('should make GET request with correct URL and parameters', () => {
      const mockResponse: WeatherForecastDto = {
        cod: '',
        message: 0,
        cnt: 0,
        list: [],
        city: {
          id: 0,
          name: '',
          coord: {
            lat,
            lon,
          },
          country: '',
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
        },
      };

      service.getCityWeatherForecast(lat, lon).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const expectedUrl = `/api/data/2.5/forecast?${stringify({
        lat,
        lon,
        appid: mockEnv.openWeatherApiKey,
        units: 'metric',
      })}`;

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
