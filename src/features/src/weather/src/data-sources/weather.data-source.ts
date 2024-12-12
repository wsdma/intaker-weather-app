import { effect, inject, Injectable } from '@angular/core';
import { CityGeocoderApiService } from '../services/city-finder/city-geocoder-api.service';
import { WeatherApiService } from '../services/weather/weather-api.service';
import { ComponentStore } from '@ngrx/component-store';
import { LocalStorageService } from '@app/core';
import { catchError, EMPTY, filter, forkJoin, switchMap, tap } from 'rxjs';
import { City } from '../interfaces/city.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { differenceInMinutes } from 'date-fns';
import {
  prepareCurrentWeatherData,
  prepareForecastData,
  prepareGeoId,
} from '../utils/utils';
import { CityWeatherData } from '../interfaces/weather.interface';

const CACHE_DATA_LIFETIME = 60; // in minutes

interface WeatherDataSourceStage {
  loading: boolean;
  geocodedCities: City[];
  geocodeCityNameApiError: boolean;
  weatherDataMap: {
    [geoId: string]: CityWeatherData;
  };
  selectedCityGeoId: string | null;
}

@Injectable()
export class WeatherDataSource extends ComponentStore<WeatherDataSourceStage> {
  #cityGeocoderService = inject(CityGeocoderApiService);
  #weatherApiService = inject(WeatherApiService);
  #localStorageService = inject(LocalStorageService);

  geocodedCities = toSignal(
    this.select((state) => state.geocodedCities),
    {
      initialValue: [],
    },
  );
  selectedCityWeatherData = toSignal(
    this.select((state) => {
      if (!state.selectedCityGeoId) return null;
      return state.weatherDataMap[state.selectedCityGeoId];
    }),
    {
      initialValue: null,
    },
  );

  geocodeCityNameApiError = toSignal(
    this.select((state) => state.geocodeCityNameApiError),
    {
      initialValue: false,
    },
  );

  favouriteCities = toSignal(
    this.select((state) =>
      Object.keys(state.weatherDataMap)
        .map((id) => state.weatherDataMap[id])
        .filter((cityData) => cityData.isFavourite),
    ),
    {
      initialValue: [],
    },
  );

  loading = toSignal(
    this.select((state) => state.loading),
    {
      initialValue: false,
    },
  );

  geocodeCityName = this.effect<string>((cityName$) =>
    cityName$.pipe(
      switchMap((cityName) =>
        this.#cityGeocoderService.find(cityName).pipe(
          tap((r) => {
            this.patchState({
              geocodedCities: r.list,
              geocodeCityNameApiError: false,
            });
          }),
          catchError(() => {
            this.patchState({ geocodeCityNameApiError: true });
            return EMPTY;
          }),
        ),
      ),
    ),
  );

  getCityWeatherData = this.effect<{ lat: number; lon: number }>(
    (cityCoords$) =>
      cityCoords$.pipe(
        tap((coords) => {
          this.patchState({
            selectedCityGeoId: prepareGeoId(coords),
          });
        }),
        filter(() => {
          const geoId = this.state().selectedCityGeoId;
          if (!geoId) return false;
          if (!this.state().weatherDataMap[geoId]) {
            return true;
          }
          return (
            differenceInMinutes(
              new Date(),
              this.state().weatherDataMap[geoId].loadedTimestamp,
            ) > CACHE_DATA_LIFETIME
          );
        }),
        tap(() => {
          this.patchState({
            loading: true,
          });
        }),
        switchMap((coords) =>
          forkJoin([
            this.#weatherApiService.getCurrentCityWeatherData(
              coords.lat,
              coords.lon,
            ),
            this.#weatherApiService.getCityWeatherForecast(
              coords.lat,
              coords.lon,
            ),
          ]).pipe(
            tap(([curr, forecast]) => {
              const geoId = this.state().selectedCityGeoId;
              if (!geoId) return;
              this.patchState({
                weatherDataMap: {
                  ...this.state().weatherDataMap,
                  [geoId]: {
                    ...this.state().weatherDataMap[geoId],
                    current: prepareCurrentWeatherData(curr),
                    forecast: prepareForecastData(forecast),
                    loadedTimestamp: Date.now(),
                    error: false,
                  },
                },
                loading: false,
              });
            }),
            catchError(() => {
              const geoId = this.state().selectedCityGeoId;
              if (!geoId) return EMPTY;
              this.patchState({
                weatherDataMap: {
                  ...this.state().weatherDataMap,
                  [geoId]: {
                    ...this.state().weatherDataMap[geoId],
                    error: true,
                  },
                },
                loading: false,
              });
              return EMPTY;
            }),
          ),
        ),
      ),
  );

  toggleSelectedCityFavorite = this.updater((state) => {
    const geoId = state.selectedCityGeoId;
    if (!geoId) return state;
    return {
      ...state,
      weatherDataMap: {
        ...state.weatherDataMap,
        [geoId]: {
          ...state.weatherDataMap[geoId],
          isFavourite: !state.weatherDataMap[geoId].isFavourite,
        },
      },
    };
  });

  retrieveFavouriteCitiesDataFromStorage(): void {
    const favourites =
      this.#localStorageService.getItem<CityWeatherData[]>('favourites');
    if (!favourites) return;
    this.patchState({
      weatherDataMap: favourites.reduce(
        (acc, item) => {
          const geoId = prepareGeoId(item.current);
          return {
            ...acc,
            [geoId]: item,
          };
        },
        {} as {
          [key: string]: CityWeatherData;
        },
      ),
    });
  }

  constructor() {
    super({
      loading: false,
      weatherDataMap: {},
      geocodedCities: [],
      selectedCityGeoId: null,
      geocodeCityNameApiError: false,
    });

    effect(() => {
      const favourites = this.favouriteCities();
      this.#localStorageService.setItem('favourites', favourites);
    });

    this.retrieveFavouriteCitiesDataFromStorage();
  }
}
