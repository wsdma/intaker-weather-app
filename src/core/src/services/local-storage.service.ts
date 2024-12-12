import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: unknown): void {
    localStorage.setItem(`weather_app_${key}`, JSON.stringify(value));
  }

  getItem<T = unknown>(key: string): T | null {
    try {
      const val = localStorage.getItem(`weather_app_${key}`);
      return val && JSON.parse(val);
    } catch (err) {
      return null;
    }
  }
}
