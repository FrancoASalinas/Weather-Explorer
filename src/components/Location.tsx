import { useState } from 'react';
import { ForecastData, Location as LocationType, WeatherData } from '../types';
import LoadingIndicator from './LoadingIndicator';
import API_KEY from '../utils/API_KEY';
import LocationWeather from './LocationWeather';
import { showWeatherButton } from '../constants/Location';
import useFetch from 'src/utils/useFetch';
import useForecastData from 'src/utils/useForecastData';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isToggle, setIsToggle] = useState(false);
  const weatherData: WeatherData = useFetch(
    isToggle
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      : null
  );
  const forecastData: ForecastData = useForecastData(
    isToggle ? { lat, lon } : null
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
