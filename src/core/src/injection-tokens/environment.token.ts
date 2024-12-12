import { InjectionToken } from '@angular/core';
import { Environment } from '../interfaces/environment';

export const ENV = new InjectionToken<Environment>(
  'Application environment config',
);
