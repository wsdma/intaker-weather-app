import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherDataSource } from '../data-sources/weather.data-source';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiService } from '../services/weather/weather-api.service';
import { CityGeocoderApiService } from '../services/city-finder/city-geocoder-api.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { ForecastComponent } from '../forecast/forecast.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-weather',
  imports: [
    ReactiveFormsModule,
    SidebarComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatDivider,
    MatProgressSpinner,
  ],
  providers: [WeatherDataSource, WeatherApiService, CityGeocoderApiService],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherContainerComponent {
  #dataSource = inject(WeatherDataSource);

  geocodedCities = this.#dataSource.geocodedCities;
  currentWeather = this.#dataSource.selectedCityWeatherData;
  geocodeCityNameApiError = this.#dataSource.geocodeCityNameApiError;
  favouriteCities = this.#dataSource.favouriteCities;
  loading = this.#dataSource.loading;

  selectCity(coords: { lat: number; lon: number }): void {
    this.#dataSource.getCityWeatherData(coords);
  }

  searchCities(query: string): void {
    this.#dataSource.geocodeCityName(query);
  }

  toggleFavourite(): void {
    this.#dataSource.toggleSelectedCityFavorite();
  }
}
