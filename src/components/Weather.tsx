/// <reference types="vite-plugin-svgr/client" />
import { Forecast } from 'src/utils/transformForecastData';
import Wind from 'src/assets/icons/wind-icon.svg?react';
import Temperature from 'src/assets/icons/temperature-icon.svg?react';
import Precipitation from 'src/assets/icons/precipitation-icon.svg?react';

function Weather({
  weatherData,
  onImageLoad,
}: {
  weatherData: Forecast['current'];
  onImageLoad: () => void;
}) {
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
            <img
              src={backgroundImage}
              onLoad={onImageLoad}
              data-testid='weather-background-image'
            />
          </div>
        </>
      )}
      <h3 className='weather__data weather__data--name'>{name}</h3>
      <img className='weather__icon' src={weather.icon} />
      <span className='weather__data weather__data--description'>
        {weather.description}
      </span>
      <div className='weather__data weather__data--temp'>
        <Temperature className='weather__data__icon weather__data__icon--temperature' />
        {main.temp}
      </div>
      <div className='weather__data weather__data--precipitation'>
        <Precipitation className='weather__data__icon weather__data__icon--precipitation' />
        {precipitation_probability}
      </div>
      <div className='weather__data weather__data--wind'>
        <Wind className='weather__data__icon weather__data__icon--wind' />
        <div className=''>
          <span>{wind.speed}</span> <span>{wind.deg}</span>
        </div>
      </div>
    </>
  );
}

export default Weather;
