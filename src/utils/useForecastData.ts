import { ForecastData } from 'src/types';
import useFetch from './useFetch';

function useForecastData(
  coords: { lat: number; lon: number } | null
): ForecastData {
  return useFetch(
    coords
      ? `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=GMT&past_days=7&forecast_days=8`
      : null
  );
}

export default useForecastData;
