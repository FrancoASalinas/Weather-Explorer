import { WeatherData } from '../types';

export default function LocationWeather({
  currentWeather,
  isToggle,
}: {
  currentWeather?: WeatherData;
  isToggle: boolean;
}) {
  if (currentWeather && isToggle) {
    const { weather, main, visibility, wind } = currentWeather;

    return (
      <>
        {weather.map(data => (
          <li className='location-search__locations__location__weather__data-item'>
            <span>
              {data.main} ({data.description})
            </span>
          </li>
        ))}
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
        {visibility && (
          <li className='location-search__locations__location__weather__data-item'>
            <span>Visibility</span>
            <ul>
              <li>{visibility / 1000}km</li>
            </ul>
          </li>
        )}
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
