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
  const isLoading = !forecast && !error;
  const [isChartWide, setIsChartWide] = useState(true);
  const weatherRef = useRef<HTMLDivElement>(null);

  function handleCardClick(cardData: ForecastCardData) {
    setForecast(cardData);
  }

  useEffect(() => {
    function activateAxies() {
      if (weatherRef.current) {
        window.innerWidth > 900 && weatherRef.current.offsetWidth > 900
          ? setIsChartWide(true)
          : setIsChartWide(false);
      }
    }

    window.addEventListener('resize', activateAxies);
    activateAxies();

    return () => window.removeEventListener('resize', activateAxies);
  }, []);

  return (
    <div
      className={isLoading || isLoadingImage ? `weather--loading` : 'weather'}
      data-testid={testId}
      ref={weatherRef}
    >
      {(isLoading || isLoadingImage) && <LoadingIndicator />}
      {!isLoading && (
        <>
          <div className={`chart ${isChart ? 'chart--active' : ''}`}>
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
              isWide={isChartWide}
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
