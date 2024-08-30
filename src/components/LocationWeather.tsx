import { WeatherResult } from '../types';
import windIcon from '../assets/wind-icon.svg';
import temperatureIcon from '../assets/temperature-icon.svg';
import humidityIcon from '../assets/humidity-icon.svg';
import precipitationIcon from '../assets/precipitation-icon.svg';
import { testId } from '../constants/LocationWeather';
import ForecastCarousel from './ForecastCarousel';
import useForecastData from 'src/utils/useForecastData';
import LoadingIndicator from './LoadingIndicator';

export default function LocationWeather({
  className,
  coords,
}: {
  className: string;
  coords: { lat: number; lon: number };
}) {
  const { lat, lon } = coords;
  const [forecastData, forecastError] = useForecastData({ lat, lon });
  const isLoading = !forecastData && !forecastError;

  if (!isLoading) {
    const {
      weather,
      main,
      precipitation_probability,
      wind,
      name,
      backgroundImage,
    } = forecastData?.current as WeatherResult['current'];

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
        <img className='weather__icon' src={weather.icon} />
        <span className='weather__description weather__data'>
          {weather.description}
        </span>
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
        <div className='weather__data weather__precipitation'>
          <img
            className='weather__data__icon'
            src={precipitationIcon}
            alt='precipitation'
          />
          {precipitation_probability}%
        </div>
        <div className='weather__data weather__wind'>
          <img className='weather__data__icon' src={windIcon} alt='wind' />
          <span>{wind.speed}m/s</span> <span>{wind.deg}º</span>
        </div>
        <ForecastCarousel forecastData={forecastData as WeatherResult} />
      </div>
    );
  } else return <LoadingIndicator />;
}
