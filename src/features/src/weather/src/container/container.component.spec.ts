import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherContainerComponent } from '@app/features';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@app/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('WeatherContainerComponent', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherContainerComponent],
      providers: [
        provideNoopAnimations(),
        { provide: HttpClient, useValue: {} },
        { provide: ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
