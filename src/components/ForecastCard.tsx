import { useEffect, useRef, useState } from 'react';
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
  const selectedCardRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (selectedCardRef.current && !isScrolled) {
      scrollToCard(selectedCardRef.current);
      setIsScrolled(true);
    }
  });

  return (
    <div
      onClick={() => onClick(data)}
      ref={data.isToday ? selectedCardRef : undefined}
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

function scrollToCard(cardElementRef: HTMLDivElement) {
  cardElementRef.scrollIntoView &&
    cardElementRef.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'end',
    });
}

export default ForecastCard;
