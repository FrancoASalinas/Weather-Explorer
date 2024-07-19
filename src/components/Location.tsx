import { useState } from 'react';
import { Location as LocationType, WeatherData } from '../types';
import { showWeatherButton } from '../contents/Location';
import LoadingIndicator from './LoadingIndicator';
import API_KEY from '../API_KEY';
import LocationWeather from './LocationWeather';

export default function Location({ location }: { location: LocationType }) {
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
      className='location-search__locations__location'
    >
      <div
        className={`location-search__locations__location__main ${
          isToggle && 'location-search__locations__location__main--toggle'
        }`}
      >
        <div className='location-search__locations__location__name'>
          <span>
            {name}, {country}
          </span>
          {state && <span>{state}</span>}
        </div>
        <button
          className='location-search__locations__location__button'
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
          <ul className='location-search__locations__location__weather'>
            <LocationWeather isToggle={isToggle} currentWeather={weatherData} />
          </ul>
        )
      ) : undefined}
    </div>
  );
}
