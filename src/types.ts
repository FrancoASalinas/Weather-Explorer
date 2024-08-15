type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: { all: number };
  rain?: { '1h'?: number; '3h'?: number };
  snow?: { '1h'?: number; '3h'?: number };
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
};

type Location = {
  name: string;
  local_names: { [key: string | 'ascii' | 'feature_name']: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
};

type UserLocationData = {
  latitude: number;
  longitude: number;
};

type Layer = {
  name: string;
  urlString: string;
  unit: string;
  metrics: number[];
  id: string;
};

type ForecastData = {
  latitude: number;
  longitude: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    pressure_msl: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    rain: number;
    showers: number;
    snowfall: number;
    weather_code: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    rain_sum: string;
    showers_sum: string;
    snowfall_sum: string;
    wind_speed_10m_max: string;
    wind_direction_10m_dominant: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    showers_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
};

export {
  type WeatherData,
  type Location,
  type UserLocationData,
  type Layer,
  type ForecastData,
};
