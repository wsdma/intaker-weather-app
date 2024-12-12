import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { apiUrlInterceptor, ENV, environment } from '@app/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]),
    { provide: ENV, useValue: environment },
    provideHttpClient(withInterceptors([apiUrlInterceptor])),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
