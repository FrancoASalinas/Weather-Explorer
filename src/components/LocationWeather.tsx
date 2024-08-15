import { WeatherData } from '../types';
import windIcon from '../assets/wind-icon.svg';
import temperatureIcon from '../assets/temperature-icon.svg';
import humidityIcon from '../assets/humidity-icon.svg';
import visibilityIcon from '../assets/visibility-icon.svg';
import getBackgroundImage from '../utils/getBackgroundImage';
import { testId } from '../constants/LocationWeather';
import ForecastCarousel from './ForecastCarousel';
import forecastMock from '../mocks/forecastMock';

export default function LocationWeather({
  currentWeather,
  isToggle,
  className,
}: {
  currentWeather?: WeatherData;
  isToggle: boolean;
  className: string;
  lat: number;
  lon: number;
}) {
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
        <h3 className='weather--user__name'>{name}</h3>
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
        <ForecastCarousel forecastData={forecastMock} />
      </div>
    );
  }
}
