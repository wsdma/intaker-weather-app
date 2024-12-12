import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'qs';
import { ENV } from '@app/core';
import { Observable } from 'rxjs';
import {
  CurrentWeatherDto,
  WeatherForecastDto,
} from '../../interfaces/weather.interface';

@Injectable()
export class WeatherApiService {
  #http = inject(HttpClient);
  #env = inject(ENV);

  getCurrentCityWeatherData(
    lat: number,
    lon: number,
  ): Observable<CurrentWeatherDto> {
    return this.#http.get<CurrentWeatherDto>(
      `/api/data/2.5/weather?${stringify({ lat, lon, appid: this.#env.openWeatherApiKey, units: 'metric' })}`,
    );
  }

  getCityWeatherForecast(lat: number, lon: number): Observable<WeatherForecastDto> {
    return this.#http.get<WeatherForecastDto>(
      `/api/data/2.5/forecast?${stringify({ lat, lon, appid: this.#env.openWeatherApiKey, units: 'metric' })}`,
    );
  }
}
