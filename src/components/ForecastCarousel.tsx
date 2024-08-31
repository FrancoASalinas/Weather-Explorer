import { WeatherResult } from 'src/types';
import ForecastCard from 'src/components/ForecastCard';
import { carousel } from 'src/constants/ForecastCarousel';

function ForecastCarousel({ forecastData }: { forecastData: WeatherResult }) {

  return (
    <div className='forecast-carousel' data-testid={carousel.testid}>
      {forecastData.daily.map(data => (
        <ForecastCard
          data={data}
          key={data.time}
        />
      ))}
    </div>
  );
}

export default ForecastCarousel;
