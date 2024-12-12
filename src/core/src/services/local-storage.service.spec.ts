import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorage', [
      'getItem',
      'setItem',
    ]);

    Object.defineProperty(window, 'localStorage', {
      value: localStorageSpy,
    });

    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should store stringified value with prefix', () => {
      const key = 'testKey';
      const value = { test: 'data' };

      service.setItem(key, value);

      expect(localStorageSpy.setItem).toHaveBeenCalledWith(
        'weather_app_testKey',
        JSON.stringify(value),
      );
    });
  });

  describe('getItem', () => {
    it('should retrieve and parse stored value', () => {
      const key = 'testKey';
      const storedValue = { test: 'data' };
      localStorageSpy.getItem.and.returnValue(JSON.stringify(storedValue));

      const result = service.getItem(key);

      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        'weather_app_testKey',
      );
      expect(result).toEqual(storedValue);
    });

    it('should return null for non-existent key', () => {
      const key = 'nonExistentKey';
      localStorageSpy.getItem.and.returnValue(null);

      const result = service.getItem(key);

      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        'weather_app_nonExistentKey',
      );
      expect(result).toBeNull();
    });

    it('should return null when parsing fails', () => {
      const key = 'invalidKey';
      localStorageSpy.getItem.and.returnValue('invalid json{');

      const result = service.getItem(key);

      expect(localStorageSpy.getItem).toHaveBeenCalledWith(
        'weather_app_invalidKey',
      );
      expect(result).toBeNull();
    });
  });
});
