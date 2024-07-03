import { WeatherData } from '../types';

const mock: WeatherData[] = [
  {
    coord: {
      lon: -0.1276,
      lat: 51.5073,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    base: 'stations',
    main: {
      temp: 289.08,
      feels_like: 288.53,
      temp_min: 287.08,
      temp_max: 290.03,
      pressure: 1005,
      humidity: 69,
    },
    visibility: 10000,
    wind: {
      speed: 4.63,
      deg: 220,
    },
    clouds: {
      all: 85,
    },
    dt: 1718569713,
    sys: {
      type: 2,
      id: 2006068,
      country: 'GB',
      sunrise: 1718509363,
      sunset: 1718569195,
    },
    timezone: 3600,
    id: 2643743,
    name: 'London',
    cod: 200,
  },
  {
    coord: {
      lon: -0.0901,
      lat: 51.5237,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    base: 'stations',
    main: {
      temp: 288.97,
      feels_like: 288.33,
      temp_min: 287.12,
      temp_max: 290.02,
      pressure: 1005,
      humidity: 66,
    },
    visibility: 10000,
    wind: {
      speed: 4.63,
      deg: 220,
    },
    clouds: {
      all: 90,
    },
    dt: 1718569894,
    sys: {
      type: 1,
      id: 1414,
      country: 'GB',
      sunrise: 1718509348,
      sunset: 1718569192,
    },
    timezone: 3600,
    id: 6690594,
    name: 'City of London',
    cod: 200,
  },
  {
    coord: {
      lon: -81.2434,
      lat: 42.9832,
    },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d',
      },
    ],
    base: 'stations',
    main: {
      temp: 299.58,
      feels_like: 299.57,
      temp_min: 298.85,
      temp_max: 299.96,
      pressure: 1009,
      humidity: 35,
    },
    visibility: 10000,
    wind: {
      speed: 5.66,
      deg: 160,
    },
    clouds: {
      all: 75,
    },
    dt: 1718570091,
    sys: {
      type: 2,
      id: 20399,
      country: 'CA',
      sunrise: 1718531124,
      sunset: 1718586375,
    },
    timezone: -14400,
    id: 6058560,
    name: 'London2',
    cod: 200,
  },
];

export default mock;
