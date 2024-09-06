import { testId } from 'src/constants/LocationWeather';
import ForecastCarousel from 'src/components/ForecastCarousel';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { Forecast } from 'src/utils/transformForecastData';
import { ForecastCardData } from 'src/types';
import useForecast from 'src/utils/useForecast';
import Weather from './Weather';
import { useState } from 'react';

export default function LocationWeather({
  coords,
}: {
  coords: { lat: number; lon: number };
}) {
  const [forecast, setForecast, error] = useForecast(coords);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const isLoading = !forecast && !error;

  function handleCardClick(cardData: ForecastCardData) {
    setForecast(cardData);
  }

  return (
    <div
      className={isLoading || isLoadingImage ? `weather--loading` : 'weather'}
      data-testid={testId}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
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
