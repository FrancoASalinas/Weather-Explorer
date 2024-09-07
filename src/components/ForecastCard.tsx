import { card, img } from 'src/constants/ForecastCard';
import { ForecastCardData } from 'src/types';
import weatherDescriptions from 'src/utils/weatherDescriptions';

function ForecastCard({
  data,
  onClick,
  isSelected,
}: {
  data: ForecastCardData;
  onClick: (data: ForecastCardData) => void;
  isSelected: boolean;
}) {
  const weatherDescription = weatherDescriptions[`${data.weather_code}`].day;

  return (
    <div
      onClick={() => onClick(data)}
      className={isSelected ? 'forecast-card--selected' : 'forecast-card'}
      data-testid={card.testid}
    >
      <span className='forecast-card__date'>{data.time}</span>
      <img
        className='forecast-card__icon'
        src={weatherDescription.image}
        alt={weatherDescription.description}
        data-testid={img.testid}
      />
      <div className='forecast-card__temperature'>
        <span className='forecast-card__temperature__max'>
          {data.temperature_max}
        </span>
        <div className='forecast-card__temperature__divisor'></div>
        <span className='forecast-card__temperature__min'>
          {data.temperature_min}
        </span>
      </div>
    </div>
  );
}
export default ForecastCard;
