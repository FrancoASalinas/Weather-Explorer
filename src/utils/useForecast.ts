import { useEffect, useState } from 'react';
import { Forecast } from './transformForecastData';
import useForecastData from './useForecastData';
import { ForecastCardData, Location } from 'src/types';

function useForecast(
  coords: { lat: number; lon: number } | null,
  locationData?: Location
) {
  const [_forecastData, forecastError] = useForecastData(coords, locationData);
  const [forecast, _setForecast] = useState<Forecast>();
  const [isDataChanged, setIsDataChanged] = useState(false);

  function setForecast(newData: ForecastCardData) {
    _forecastData && _forecastData.setCurrent(newData);
    setIsDataChanged(true);
  }

  useEffect(() => {
    if (_forecastData && !forecast) {
      _setForecast(_forecastData);
    }
    if (isDataChanged) {
      _setForecast(_forecastData);
      setIsDataChanged(false);
    }
  }, [_forecastData, forecast]);

  return [forecast, setForecast, forecastError] as const;
}

export default useForecast;
