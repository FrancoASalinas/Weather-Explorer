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
  return (
    <div className='forecast-carousel' data-testid={carousel.testid}>
      {forecastData.daily.map(data => (
        <ForecastCard
          data={data}
          isSelected={selectedCard === data}
          key={data.time}
          onClick={data => {
            setSelectedCard(data);
            onCardClick(data);
          }}
        />
      ))}
    </div>
  );
}

export default ForecastCarousel;
