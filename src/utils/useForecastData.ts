import { ForecastData, Location, WeatherResult } from 'src/types';
import useFetch from './useFetch';
import { useEffect, useState } from 'react';
import transformForecastData from './transformForecastData';
import API_KEY from './API_KEY';

function useForecastData(
  coords: { lat: number; lon: number } | null,
  locationData?: Location
) {
  const [location, setLocation] = useState(locationData);
  const [forecast, forecastError] = useFetch<ForecastData>(
    coords
      ? `https://api.open-meteo.com/v1/forecast?latitude=${
          location ? location.lat : coords.lat
        }&longitude=${
          location ? location.lon : coords.lon
        }&current=temperature_2m,is_day,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&past_days=7&forecast_days=8`
      : null
  );
  const [newLocation, newLocationError] = useFetch<Location[]>(
    !location && coords
      ? `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.lat}&lon=${
          coords.lon
        }&limit=${1}&appid=${API_KEY}`
      : null
  );
  const [result, setResult] = useState<WeatherResult>();
  const [error, setError] = useState<typeof forecastError>();

  useEffect(() => {
    if (!location && newLocation) {
      setLocation(newLocation[0]);
    }

    if (!result) {
      if (forecast && location) {
        setResult(transformForecastData(forecast, location));
      }
    } else if (forecastError || newLocationError) {
      setError(forecastError || newLocationError);
    }
  }, [
    newLocation,
    forecast,
    result,
    forecastError,
    newLocationError,
    location,
  ]);

  return [result, error] as const;
}

export default useForecastData;
