import { WeatherData } from '../types';
import thunderstorm from '../assets/thunderstorm.jpg';
import rain from '../assets/rain.jpg';
import snow from '../assets/thunderstorm.jpg';
import mist from '../assets/mist.jpg';
import dust from '../assets/dust.jpg';
import haze from '../assets/haze.jpg';
import clearSky from '../assets/clear-sky-2.jpg';
import clearSkyNight from '../assets/clear-sky-night.jpg';
import snowNight from '../assets/snow-night.jpg';
import cloudyNight from '../assets/cloudy-night.jpg';
import brokenClouds from '../assets/broken-clouds.jpg';
import cloudy from '../assets/cloudy.jpg';

export const testId = 'weather';

export default function LocationWeather({
  currentWeather,
  isToggle,
  title,
  className,
}: {
  currentWeather?: WeatherData;
  title?: string;
  isToggle: boolean;
  className: string;
}) {
  if (currentWeather && isToggle) {
    const { weather, main, visibility, wind } = currentWeather;

    function getBackgroundImage() {
      const id = weather[0].id.toString();
      const isNight = weather[0].icon.includes('n');
      const images = [
        { src: thunderstorm, matchingId: '2' },
        { src: rain, matchingId: '5' },
        { src: rain, matchingId: '3' },
        { src: snow, matchingId: '6' },
        { src: mist, matchingId: '7' },
        { src: dust, matchingId: '731' },
        { src: haze, matchingId: '721' },
        { src: clearSky, matchingId: '8' },
        { src: brokenClouds, matchingId: '803' },
        { src: cloudy, matchingId: '804' },
        { src: clearSkyNight, matchingId: 'n8' },
        { src: snowNight, matchingId: 'n6' },
        { src: cloudyNight, matchingId: 'n804' },
      ];

      const map = new Map<string, string>();

      for (let image of images) {
        map.set(image.matchingId, image.src);
      }

      const matchingImage = isNight
        ? map.get(`n${id}`) || map.get(`n${id[0]}`)
        : map.get(id) || map.get(`${id[0]}`);

      return matchingImage ? matchingImage : undefined;
    }

    const backgroundImage = getBackgroundImage();

    return (
      <div className={className} data-testid={testId}>
        {backgroundImage && (
          <>
            <div className='weather__background-image'>
              <img src={backgroundImage} />
            </div>
          </>
        )}
        {title && (
          <h3 className='user-city-name weather__data-item'>{title}</h3>
        )}
        {weather.map(data => (
          <li key={data.id} className='weather__data-item'>
            <span>
              {data.main} ({data.description})
            </span>
          </li>
        ))}
        <li className='weather__data-item'>
          <span>Temperature</span>
          <ul>
            <li>{main.temp}ºC</li>
            <li>Max: {main.temp_max}ºC</li>
            <li>Min: {main.temp_min}ºC</li>
            <li>Feels like: {main.feels_like}ºC</li>
          </ul>
        </li>
        <li className='weather__data-item'>
          <span>Humidity</span>
          <ul>
            <li>{main.humidity}%</li>
          </ul>
        </li>
        {visibility && (
          <li className='weather__data-item'>
            <span>Visibility</span>
            <ul>
              <li>{visibility / 1000}km</li>
            </ul>
          </li>
        )}
        <li className='weather__data-item'>
          <span>Wind</span>
          <ul>
            <li>Speed: {wind.speed}m/s</li>
            <li>Direction: {wind.deg}º</li>
          </ul>
        </li>
      </div>
    );
  }
}
