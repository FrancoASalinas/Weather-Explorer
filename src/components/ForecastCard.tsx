import { ForecastCardData } from 'src/types';
import weatherDescriptions from 'src/utils/weatherDescriptions';

function ForecastCard({ data }: { data: ForecastCardData }) {
  const weatherDescription = weatherDescriptions[`${data.weather_code}`].day;

  return (
    <div className='forecast-card'>
      <span className='forecast-card__date'>{data.time}</span>
      <img
        className='forecast-card__icon'
        src={weatherDescription.image}
        alt={weatherDescription.description}
        data-testid='forecast-icon'
      />
      <div className='forecast-card__temperature'>
        <span className='forecast-card__temperature__max'>
          {data.temperature_max}
          {data.units.temperature_2m_max}
        </span>
        <div className='forecast-card__temperature__divisor'></div>
        <span className='forecast-card__temperature__min'>
          {data.temperature_min}
          {data.units.temperature_2m_min}
        </span>
      </div>
    </div>
  );
}

export default ForecastCard;
