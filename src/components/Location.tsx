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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
        .then(res => res.json())
        .then((data: WeatherData) => setWeatherData(data));

      setIsLoading(false);
    }
  }

  return (
    <li data-testid={lat + lon}>
      <ul className='location-search__locations__location'>
        <li className='location-search__locations__location__name'>
          {name}, {country}
        </li>
        {state && <li>{state}</li>}
        <button
          onClick={handleLocationClick}
          data-testid={showWeatherButton.testid}
        >
          {showWeatherButton.text}
        </button>
      </ul>
      <ul>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <LocationWeather currentWeather={weatherData} />
        )}
      </ul>
    </li>
  );

  function LocationWeather({
    currentWeather,
  }: {
    currentWeather?: WeatherData;
  }) {
    if (currentWeather && isToggle) {
      const result = [];
      const { weather, main, visibility, wind, clouds, rain, snow } =
        currentWeather;
      const weatherInfo = Array<any>(
        weather[0],
        main,
        { visibility },
        wind,
        clouds,
        rain,
        snow
      );

      for (let record of weatherInfo) {
        record && result.push(createListsFromRecord(record));
      }

      return result;

      function createListsFromRecord(record: { any: any }) {
        return Object.entries(record).map(([key, value]) => (
          <li key={key + value}>{value}</li>
        ));
      }
    }
  }
}
