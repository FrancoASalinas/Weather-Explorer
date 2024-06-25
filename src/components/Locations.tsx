import { showWeatherButton } from '../contents/App';
import { Location } from '../types';
import LoadingIndicator from './LoadingIndicator';

type Props = {
  isLoading: boolean;
  unexpectedError: boolean;
  isSearched: boolean;
  locationArray: Location[];
  error: { [key: string]: string };
  onClick: (lat: number, lon: number) => void;
};

export default function Locations({
  error,
  isLoading,
  isSearched,
  locationArray,
  unexpectedError,
  onClick,
}: Props) {
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (unexpectedError) {
    return <>{error.unexpected}</>;
  }
  if (isSearched && locationArray.length === 0) {
    return <>{error.noCity}</>;
  }

  return (
    <ul className='location-search__locations'>
      {locationArray.map(
        ({
          lat,
          lon,
          name,
          country,
          state,
          isLoadingWeather,
          currentWeather,
        }) => (
          <li key={lat + lon} data-testid={lat + lon}>
            <ul>
              <li>{name}</li>
              <li>{country}</li>
              {state && <li>{state}</li>}
              <button
                onClick={() => onClick(lat, lon)}
                data-testid={showWeatherButton.testid}
              >
                Show weather
              </button>
            </ul>
            <ul>{populateLocationWeather(isLoadingWeather, currentWeather)}</ul>
          </li>
        )
      )}
    </ul>
  );

  function populateLocationWeather(
    isLoadingWeather: boolean | undefined,
    currentWeather: Location['currentWeather']
  ) {
    if (isLoadingWeather) {
      return <LoadingIndicator />;
    } else if (currentWeather !== undefined) {
      const result = [];
      const { weather, main, visibility, wind, clouds, rain, snow } =
        currentWeather;
      const weatherInfo = Array<any>(
        weather[0],
        main,
        { visibility },
        wind,
        clouds,
        rain,
        snow
      );

      for (let record of weatherInfo) {
        record && result.push(createListsFromRecord(record));
      }

      return result;

      function createListsFromRecord(record: { any: any }) {
        return Object.entries(record).map(([key, value]) => (
          <li key={key + value}>{value}</li>
        ));
      }
    }
  }
}
