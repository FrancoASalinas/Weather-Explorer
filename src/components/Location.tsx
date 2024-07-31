import { useState } from 'react';
import { Location as LocationType, WeatherData } from '../types';
import LoadingIndicator from './LoadingIndicator';
import API_KEY from '../utils/API_KEY';
import LocationWeather from './LocationWeather';
import { showWeatherButton } from '../constants/Location';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isLoading, setIsLoading] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();

  async function handleLocationClick() {
    setIsToggle(prev => !prev);
    if (weatherData === undefined) {
      setIsLoading(true);

      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then((data: WeatherData) => setWeatherData(data));

      setIsLoading(false);
    }
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
      {isToggle ? (
        isLoading ? (
          <LoadingIndicator />
        ) : (
          <LocationWeather
            className='weather--location'
            isToggle={isToggle}
            currentWeather={weatherData}
            lat={lat}
            lon={lon}
          />
        )
      ) : undefined}
    </div>
  );
}

export default Location;
