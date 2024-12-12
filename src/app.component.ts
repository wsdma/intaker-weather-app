import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeatherContainerComponent } from '@app/features';

@Component({
  selector: 'app-root',
  imports: [WeatherContainerComponent],
  template: '<app-weather></app-weather>',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      padding: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
