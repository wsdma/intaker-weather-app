import {
  CurrentWeatherData,
  CurrentWeatherDto,
  ForecastDateData,
  WeatherForecastDto,
} from '../interfaces/weather.interface';
import { fromUnixTime, isToday, setHours } from 'date-fns';

export const prepareCurrentWeatherData = (
  data: CurrentWeatherDto,
): CurrentWeatherData => {
  return {
    name: data.name,
    country: data.sys.country,
    icon: data.weather[0]?.icon ?? null,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: data.weather[0]?.description ?? '',
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
};

export const prepareForecastData = (
  data: WeatherForecastDto,
): ForecastDateData[] => {
  const dataMap = data.list.reduce(
    (acc, item) => {
      const date = setHours(fromUnixTime(item.dt), 0).getTime();
      if (isToday(date)) return acc;
      const curTempMin = Math.round(item.main.temp_min);
      const curTempMax = Math.round(item.main.temp_max);

      return {
        ...acc,
        [date]: !acc[date]
          ? {
              date,
              min: curTempMin,
              max: curTempMax,
              description: item.weather[0]?.description ?? '',
            }
          : {
              ...acc[date],
              min: Math.min(acc[date].min, curTempMin),
              max: Math.max(acc[date].max, curTempMax),
            },
      };
    },
    {} as {
      [key: number]: ForecastDateData;
    },
  );

  return Object.keys(dataMap).map((key) => dataMap[Number(key)]);
};

export const prepareGeoId = ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): string => {
  return `${lat}_${lon}`;
};
