import { ForecastData } from '../types';

const forecastMock: ForecastData = {
  latitude: -46.6388,
  longitude: -23.5482,
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: '°C',
    relative_humidity_2m: '%',
    rain: 'mm',
    showers: 'mm',
    snowfall: 'cm',
    weather_code: 'wmo code',
    pressure_msl: 'hPa',
    wind_speed_10m: 'km/h',
    wind_direction_10m: '°',
  },
  current: {
    time: '2024-08-15T22:15',
    interval: 900,
    temperature_2m: 23.1,
    relative_humidity_2m: 76,
    rain: 0,
    showers: 0,
    snowfall: 0,
    weather_code: 1,
    pressure_msl: 1015.7,
    wind_speed_10m: 2.7,
    wind_direction_10m: 293,
  },
  daily_units: {
    time: 'iso8601',
    weather_code: 'wmo code',
    temperature_2m_max: '°C',
    temperature_2m_min: '°C',
    precipitation_sum: 'mm',
    wind_speed_10m_max: 'km/h',
    wind_direction_10m_dominant: '°',
  },
  daily: {
    time: [
      '2024-08-07',
      '2024-08-08',
      '2024-08-09',
      '2024-08-10',
      '2024-08-11',
      '2024-08-12',
      '2024-08-13',
      '2024-08-14',
      '2024-08-15',
      '2024-08-16',
      '2024-08-17',
      '2024-08-18',
      '2024-08-19',
      '2024-08-20',
      '2024-08-21',
    ],
    weather_code: [3, 80, 80, 3, 3, 1, 3, 61, 61, 3, 80, 95, 3, 2, 3],
    temperature_2m_max: [
      29, 23.2, 24.6, 26.1, 25, 27.6, 30.2, 32.7, 28.5, 28.8, 24.8, 24.9, 22.2,
      23.9, 22.6,
    ],
    temperature_2m_min: [
      15.7, 17.6, 14.6, 15.6, 18.2, 14.5, 15.6, 17.8, 20.1, 18.7, 19.6, 19.3,
      15.5, 14.5, 16.3,
    ],
    precipitation_sum: [0, 0, 0, 0, 1.4, 0, 0, 0, 0, 0, 0, 1.8, 0, 0.2, 8.8],
    wind_speed_10m_max: [
      10.7, 14.3, 16, 18, 13.6, 7.5, 13.8, 14, 13.3, 15.1, 7.8, 16.7, 16, 11.2,
      16.2,
    ],
    wind_direction_10m_dominant: [
      116, 303, 217, 266, 303, 50, 98, 118, 260, 261, 279, 6, 303, 137, 266,
    ],
  },
};

export default forecastMock;
