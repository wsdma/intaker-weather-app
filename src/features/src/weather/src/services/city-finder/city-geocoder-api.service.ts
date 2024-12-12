import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@app/core';
import { Observable } from 'rxjs';
import { stringify } from 'qs';
import { CityGeocoderResponse } from '../../interfaces/city.interface';

@Injectable()
export class CityGeocoderApiService {
  #http = inject(HttpClient);
  #env = inject(ENV);

  find(city: string): Observable<CityGeocoderResponse> {
    return this.#http.get<CityGeocoderResponse>(
      `/api/data/2.5/find?${stringify({ q: city, appid: this.#env.openWeatherApiKey })}`,
    );
  }
}
