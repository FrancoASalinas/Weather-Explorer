import { useEffect, useRef } from 'react';
import { useState } from 'react';
import ForecastCard from 'src/components/ForecastCard';
import { carousel } from 'src/constants/ForecastCarousel';
import { ForecastCardData } from 'src/types';
import { Forecast } from 'src/utils/transformForecastData';

function ForecastCarousel({
  forecastData,
  onCardClick,
}: {
  forecastData: Forecast;
  onCardClick: (data: ForecastCardData) => void;
}) {
  const [selectedCard, setSelectedCard] = useState(
    forecastData.daily.find(({ isToday }) => isToday)
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && childRef.current && !isScrolled) {
      scrollIntoViewHorizontally(scrollRef.current, childRef.current);
      setIsScrolled(true);
    }
  });

  return (
    <div
      className='forecast-carousel'
      data-testid={carousel.testid}
      ref={scrollRef}
    >
      {forecastData.daily.map(data => (
        <div ref={data.isToday ? childRef : null}>
          <ForecastCard
            data={data}
            isSelected={selectedCard === data}
            key={data.time}
            onClick={data => {
              setSelectedCard(data);
              onCardClick(data);
            }}
          />
        </div>
      ))}
    </div>
  );
}

const scrollIntoViewHorizontally = (
  container: HTMLDivElement,
  child: HTMLDivElement
) => {
  const childOffsetRight = child.offsetLeft + child.offsetWidth;
  const containerScrollRight = container.scrollLeft + container.offsetWidth;

  if (container.scrollLeft > child.offsetLeft) {
    container.scrollLeft = child.offsetLeft;
  } else if (containerScrollRight < childOffsetRight) {
    container.scrollLeft += childOffsetRight - containerScrollRight;
  }
};

export default ForecastCarousel;
