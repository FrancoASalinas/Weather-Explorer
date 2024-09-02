import { Forecast } from 'src/utils/transformForecastData';
import windIcon from 'src/assets/icons/wind-icon.svg';
import temperatureIcon from 'src/assets/icons/temperature-icon.svg';
import humidityIcon from 'src/assets/icons/humidity-icon.svg';
import precipitationIcon from 'src/assets/icons/precipitation-icon.svg';

function Weather({ weatherData }: { weatherData: Forecast['current'] }) {
  const {
    weather,
    main,
    precipitation_probability,
    wind,
    name,
    backgroundImage,
  } = weatherData;

  return (
    <>
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
      {main.humidity && (
        <div className='weather__data weather__humidity'>
          <img
            className='weather__data__icon'
            src={humidityIcon}
            alt='humidity'
          />
          {main.humidity}%
        </div>
      )}
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
        <span>{wind.speed}km/h</span> <span>{wind.deg}º</span>
      </div>
    </>
  );
}

export default Weather;
