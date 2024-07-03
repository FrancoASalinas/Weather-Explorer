import { useState } from 'react';
import { Location as LocationType, WeatherData } from '../types';
import { showWeatherButton } from '../contents/Location';
import LoadingIndicator from './LoadingIndicator';
import API_KEY from '../API_KEY';

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
      <div className='location-search__locations__location__main'>
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
            <LocationWeather currentWeather={weatherData} />
          </ul>
        )
      ) : undefined}
    </div>
  );

  function LocationWeather({
    currentWeather,
  }: {
    currentWeather?: WeatherData;
  }) {
    if (currentWeather && isToggle) {
      const { weather, main, visibility, wind } = currentWeather;

      return (
        <>
          <li className='location-search__locations__location__weather__data-item'>
            <span>
              {weather[0].main} ({weather[0].description})
            </span>
          </li>
          <li className='location-search__locations__location__weather__data-item'>
            <span>Temperature</span>
            <ul>
              <li>{main.temp}ºC</li>
              <li>Max: {main.temp_max}ºC</li>
              <li>Min: {main.temp_min}ºC</li>
              <li>Feels like: {main.feels_like}ºC</li>
            </ul>
          </li>
          <li className='location-search__locations__location__weather__data-item'>
            <span>Humidity</span>
            <ul>
              <li>{main.humidity}%</li>
            </ul>
          </li>
          <li className='location-search__locations__location__weather__data-item'>
            <span>Visibility</span>
            <ul>
              <li>{visibility}km</li>
            </ul>
          </li>
          <li className='location-search__locations__location__weather__data-item'>
            <span>Wind</span>
            <ul>
              <li>Speed: {wind.speed}m/s</li>
              <li>Direction: {wind.deg}º</li>
            </ul>
          </li>
        </>
      );
    }
  }
}
