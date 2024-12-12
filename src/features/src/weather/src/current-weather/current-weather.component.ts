import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CurrentWeatherData } from '../interfaces/weather.interface';

@Component({
  selector: 'app-weather-current-weather',
  imports: [TitleCasePipe],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
})
export class CurrentWeatherComponent {
  data = input.required<CurrentWeatherData>();
}
