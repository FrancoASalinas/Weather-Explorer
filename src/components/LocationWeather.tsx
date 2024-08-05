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
import { Link } from 'react-router-dom';
import windIcon from '../assets/wind-icon.svg';
import temperatureIcon from '../assets/temperature-icon.svg';
import humidityIcon from '../assets/humidity-icon.svg';
import visibilityIcon from '../assets/visibility-icon.svg';

export const testId = 'weather';

export default function LocationWeather({
  currentWeather,
  isToggle,
  title,
  className,
  lat,
  lon,
}: {
  currentWeather?: WeatherData;
  title?: string;
  isToggle: boolean;
  className: string;
  lat: number;
  lon: number;
}) {
  function getBackgroundImage(weather: WeatherData['weather']) {
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

    for (const image of images) {
      map.set(image.matchingId, image.src);
    }

    const matchingImage = isNight
      ? map.get(`n${id}`) || map.get(`n${id[0]}`)
      : map.get(id) || map.get(`${id[0]}`);

    return matchingImage ? matchingImage : undefined;
  }
  if (currentWeather && isToggle) {
    const { weather, main, visibility, wind, name } = currentWeather;

    const backgroundImage = getBackgroundImage(weather);

    return (
      <div className={className} data-testid={testId}>
        {backgroundImage && (
          <>
            <div className='weather__background-image'>
              <img src={backgroundImage} />
            </div>
          </>
        )}
        {title && <h3 className='weather--user__name'>{title}</h3>}
        <img
          className='weather__icon'
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        />
        {weather.map(data => (
          <span className='weather__description weather__data'>
            {data.main} ({data.description})
          </span>
        ))}
        <div className='weather__data weather__temp'>
          <img
            className='weather__data__icon'
            src={temperatureIcon}
            alt='temperature'
          />
          {main.temp}ºC
        </div>
        <div className='weather__data weather__humidity'>
          <img
            className='weather__data__icon'
            src={humidityIcon}
            alt='humidity'
          />
          {main.humidity}%
        </div>
        {visibility && (
          <div className='weather__data weather__visibility'>
            <img
              className='weather__data__icon'
              src={visibilityIcon}
              alt='visibility'
            />
            {visibility / 1000}km
          </div>
        )}
        <div className='weather__data weather__wind'>
          <img className='weather__data__icon' src={windIcon} alt='wind' />
          <span>{wind.speed}m/s</span> <span>{wind.deg}º</span>
        </div>
        <Link
          className='weather__history-link'
          to={`/history/${lat}/${lon}/${name}`}
        >
          Past Week
        </Link>
      </div>
    );
  }
}
