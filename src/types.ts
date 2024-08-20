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
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_direction_10m_dominant: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
  };
};

type ForecastCardData = {
  time: string;
  weather_code: number;
  precipitation_sum: number;
  temperature_max: number;
  temperature_min: number;
  wind_direction: number;
  wind_speed: number;
  units: ForecastData['daily_units'];
};

export {
  type ForecastCardData,
  type WeatherData,
  type Location,
  type UserLocationData,
  type Layer,
  type ForecastData,
};
