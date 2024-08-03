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

type WeatherHistoryData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: 0;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: 'iso8601';
    weather_code: 'wmo code';
    temperature_2m_max: '°C';
    temperature_2m_min: '°C';
    rain_sum: 'mm';
    showers_sum: 'mm';
    snowfall_sum: 'cm';
    wind_speed_10m_max: 'km/h';
    wind_direction_10m_dominant: '°';
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
  type WeatherHistoryData,
};
