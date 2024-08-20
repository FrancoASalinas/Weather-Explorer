import { useState } from 'react';
import { ForecastData, Location as LocationType, WeatherData } from '../types';
import LoadingIndicator from './LoadingIndicator';
import API_KEY from '../utils/API_KEY';
import LocationWeather from './LocationWeather';
import { showWeatherButton } from '../constants/Location';
import useFetch from 'src/utils/useFetch';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isToggle, setIsToggle] = useState(false);
  const weatherData: WeatherData = useFetch(
    isToggle
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      : null
  );
  const forecastData: ForecastData = useFetch(
    isToggle
      ? `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=GMT&past_days=7&forecast_days=8`
      : null
  );
  const isLoading = isToggle && (!forecastData || !weatherData);

  async function handleLocationClick() {
    setIsToggle(prev => !prev);
  }

  return (
    <div
      data-testid={lat + lon}
      className={
        isLoading ? 'locations__location--loading' : 'locations__location'
      }
    >
      <div
        className={`locations__location__main ${
          isToggle && 'locations__location__main--toggle'
        }`}
      >
        <div className='locations__location__name'>
          <span>
            {name}, {country}
          </span>
          {state && <span>{state}</span>}
        </div>
        <button
          className='locations__location__button'
          onClick={handleLocationClick}
          data-testid={showWeatherButton.testid}
        >
          {showWeatherButton.text}
        </button>
      </div>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        forecastData && (
          <LocationWeather
            className='weather--location'
            isToggle={isToggle}
            currentWeather={weatherData}
            forecastData={forecastData}
          />
        )
      )}
    </div>
  );
}

export default Location;
