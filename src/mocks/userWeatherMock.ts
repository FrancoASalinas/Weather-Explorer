import { WeatherData } from '../types';

const userWeatherMock: WeatherData = {
  coord: {
    lon: -46.6388,
    lat: -23.5482,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01n',
    },
    {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10n',
    },
  ],
  base: 'stations',
  main: {
    temp: 290.76,
    feels_like: 290.59,
    temp_min: 289.05,
    temp_max: 292.31,
    pressure: 1022,
    humidity: 77,
    sea_level: 1022,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 1.03,
    deg: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 1721263752,
  sys: {
    type: 1,
    id: 8394,
    country: 'BR',
    sunrise: 1721209640,
    sunset: 1721248665,
  },
  timezone: -10800,
  id: 3448439,
  name: 'São Paulo',
  cod: 200,
};

export default userWeatherMock;
