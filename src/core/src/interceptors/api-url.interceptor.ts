import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENV } from '../injection-tokens/environment.token';

export const apiUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const env = inject(ENV);

  if (req.url.startsWith('/api')) {
    req = req.clone({
      url: req.url.replace(/^\/api/, env.apiUrl),
    });
  }
  return next(req);
};
