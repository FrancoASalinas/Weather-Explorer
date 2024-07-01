import { WeatherData } from "../types";

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
  {
    coord: {
      lon: -0.1683,
      lat: 51.4875,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01n',
      },
    ],
    base: 'stations',
    main: {
      temp: 289.18,
      feels_like: 288.64,
      temp_min: 287.17,
      temp_max: 290.49,
      pressure: 1005,
      humidity: 69,
    },
    visibility: 10000,
    wind: {
      speed: 4.63,
      deg: 220,
    },
    clouds: {
      all: 0,
    },
    dt: 1718569612,
    sys: {
      type: 2,
      id: 2035324,
      country: 'GB',
      sunrise: 1718509379,
      sunset: 1718569198,
    },
    timezone: 3600,
    id: 2653265,
    name: 'Chelsea',
    cod: 200,
  },
  {
    coord: {
      lon: -84.0833,
      lat: 37.129,
    },
    weather: [
      {
        id: 802,
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d',
      },
    ],
    base: 'stations',
    main: {
      temp: 305.58,
      feels_like: 308.06,
      temp_min: 303,
      temp_max: 306.51,
      pressure: 1018,
      humidity: 49,
    },
    visibility: 10000,
    wind: {
      speed: 2.57,
      deg: 180,
    },
    clouds: {
      all: 40,
    },
    dt: 1718570155,
    sys: {
      type: 1,
      id: 4746,
      country: 'US',
      sunrise: 1718532959,
      sunset: 1718585903,
    },
    timezone: -14400,
    id: 4298960,
    name: 'London3',
    cod: 200,
  },
];

export default mock;