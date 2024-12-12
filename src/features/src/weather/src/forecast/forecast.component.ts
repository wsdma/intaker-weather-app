import { Component, input } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ForecastDateData } from '../interfaces/weather.interface';

@Component({
  selector: 'app-weather-forecast',
  imports: [DatePipe, TitleCasePipe],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent {
  data = input.required<ForecastDateData[]>();
}
