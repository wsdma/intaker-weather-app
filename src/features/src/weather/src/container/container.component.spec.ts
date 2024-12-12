import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherContainerComponent } from '@app/features';

describe('WeatherWidgetContainerComponent', () => {
  let component: WeatherContainerComponent;
  let fixture: ComponentFixture<WeatherContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
