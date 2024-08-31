import { useEffect, useRef } from 'react';
import { card, img } from 'src/constants/ForecastCard';
import { ForecastCardData } from 'src/types';
import weatherDescriptions from 'src/utils/weatherDescriptions';

function ForecastCard({ data }: { data: ForecastCardData }) {
  const weatherDescription = weatherDescriptions[`${data.weather_code}`].day;
  const todayCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isScrolledOnce = false;
    if (todayCardRef.current && !isScrolledOnce) {
      todayCardRef.current.scrollIntoView &&
        todayCardRef.current.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'end',
        });
      isScrolledOnce = true;
    }
  });

  return (
    <div
      ref={data.isToday ? todayCardRef : undefined}
      className={data.isToday ? 'forecast-card--today' : 'forecast-card'}
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
