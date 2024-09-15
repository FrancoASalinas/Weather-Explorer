import { testId } from 'src/constants/LocationWeather';
import ForecastCarousel from 'src/components/ForecastCarousel';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Forecast } from 'src/utils/transformForecastData';
import { ForecastCardData } from 'src/types';
import useForecast from 'src/utils/useForecast';
import Weather from './Weather';
import { useEffect, useRef, useState } from 'react';
import ForecastChart from './ForecastChart';
import Angle from 'src/assets/icons/right-angle.svg?react';

export default function LocationWeather({
  coords,
}: {
  coords: { lat: number; lon: number };
}) {
  const [forecast, setForecast, error] = useForecast(coords);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isChart, setIsChart] = useState(false);
  const [isChartWide, setIsChartWide] = useState(false);
  const isLoading = !forecast && !error;
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.clientWidth > 900 && setIsChartWide(true);
    }
  }, []);

  function handleCardClick(cardData: ForecastCardData) {
    setForecast(cardData);
  }

  return (
    <div
      className={isLoading || isLoadingImage ? `weather--loading` : 'weather'}
      data-testid={testId}
    >
      {(isLoading || isLoadingImage) && <LoadingIndicator />}
      {!isLoading && (
        <>
          <div
            className={`chart ${isChart ? 'chart--active' : ''}`}
            ref={chartRef}
          >
            <button
              onClick={() => setIsChart(prev => !prev)}
              className={`chart__button ${
                isChart ? 'chart__button--active' : ''
              }`}
              data-testid='chart-button'
            >
              <Angle className='chart__button__icon' />
            </button>
            <ForecastChart
              forecastData={forecast as Forecast}
              axies={isChartWide}
            />
          </div>
          <Weather
            weatherData={forecast?.current as Forecast['current']}
            onImageLoad={() => setIsLoadingImage(false)}
          />

          {!isLoadingImage && (
            <ForecastCarousel
              forecastData={forecast as Forecast}
              onCardClick={handleCardClick}
            />
          )}
        </>
      )}
    </div>
  );
}
