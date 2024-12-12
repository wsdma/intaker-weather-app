import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { City } from '../interfaces/city.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatList,
  MatListItem,
  MatListSubheaderCssMatStyler,
} from '@angular/material/list';
import { debounceTime, filter } from 'rxjs';
import { CityWeatherData } from '../interfaces/weather.interface';
import { inputIsEmptyValidator } from '../utils/form-validators';
import { ControlErrorsTextPipe } from '../pipes/control-errors-text.pipe';

@Component({
  selector: 'app-weather-sidebar',
  imports: [
    MatAutocomplete,
    MatFormField,
    MatIcon,
    MatInput,
    MatAutocompleteTrigger,
    MatOption,
    ReactiveFormsModule,
    MatLabel,
    MatList,
    MatListItem,
    MatError,
    MatListSubheaderCssMatStyler,
    ControlErrorsTextPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  #destroyRef = inject(DestroyRef);

  geocodedCities = input.required<City[]>();
  favouriteCities = input.required<CityWeatherData[]>();
  geocodeCityNameApiError = input.required<boolean>();

  selectCity = output<{ lat: number; lon: number }>();
  searchCity = output<string>();

  control = new FormControl('', {
    nonNullable: true,
    validators: [
      inputIsEmptyValidator,
      Validators.maxLength(100),
      Validators.minLength(3),
    ],
  });

  constructor() {
    effect(() => {
      this.control.setErrors(
        this.geocodeCityNameApiError() ? { apiError: true } : null,
      );
    });
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter((v) => !!v && this.control.valid),
        debounceTime(500),
      )
      .subscribe((city) => {
        this.searchCity.emit(city);
      });
  }

  selectPredictedCity(
    coords: { lat: number; lon: number },
    inputEl: HTMLInputElement,
  ): void {
    this.selectCity.emit(coords);
    setTimeout(() => {
      inputEl.blur();
      this.control.reset('');
    });
  }
}
