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
    is_day: string;
    weather_code: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    wind_speed_10m_max: string;
    wind_direction_10m_dominant: string;
    precipitation_probability_max: string;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
    precipitation_probability_max: number[];
  };
};

type ForecastCardData = {
  time: ForecastData['daily']['time'][0];
  weather_code: ForecastData['daily']['weather_code'][0];
  precipitation_probability_max: string;
  temperature_max: string;
  temperature_min: string;
  wind_direction: string;
  wind_speed: string;
  isToday: boolean;
};

export {
  type ForecastCardData,
  type Location,
  type UserLocationData,
  type Layer,
  type ForecastData,
};
