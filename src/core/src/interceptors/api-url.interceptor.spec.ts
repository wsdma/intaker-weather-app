import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ENV } from '../injection-tokens/environment.token';
import { apiUrlInterceptor } from './api-url.interceptor';
import { of } from 'rxjs';

describe('ApiUrlInterceptor', () => {
  const mockEnv = {
    apiUrl: 'https://api.example.com',
  };

  const mockNext: HttpHandlerFn = () => {
    return of({} as HttpEvent<unknown>);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ENV,
          useValue: mockEnv,
        },
      ],
    });
  });

  it('should replace /api with the environment apiUrl', () => {
    const request = new HttpRequest('GET', '/api/weather');
    let transformedUrl = '';

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(request, (req) => {
        transformedUrl = req.url;
        return mockNext(req);
      });
    });

    expect(transformedUrl).toBe('https://api.example.com/weather');
  });

  it('should not modify non-API urls', () => {
    const originalUrl = 'https://test.com/something';
    const request = new HttpRequest('GET', originalUrl);
    let transformedUrl = '';

    TestBed.runInInjectionContext(() => {
      apiUrlInterceptor(request, (req) => {
        transformedUrl = req.url;
        return mockNext(req);
      });
    });

    expect(transformedUrl).toBe(originalUrl);
  });
});
