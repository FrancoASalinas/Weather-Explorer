import transformForecastData from 'src/utils/transformForecastData';
import { ForecastData } from 'src/types';
import ForecastCard from 'src/components/ForecastCard';
import { carousel } from 'src/constants/ForecastCarousel';

function ForecastCarousel({ forecastData }: { forecastData: ForecastData }) {
  return (
    <div className='forecast-carousel' data-testid={carousel.testid}>
      {transformForecastData(forecastData).map(data => (
        <ForecastCard data={data} />
      ))}
    </div>
  );
}

export default ForecastCarousel;
