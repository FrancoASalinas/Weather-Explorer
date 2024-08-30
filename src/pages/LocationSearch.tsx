import { Location as LocationType } from '../types';
import LoadingIndicator from '../components/LoadingIndicator';
import Location from '../components/Location';
import { useSearchParams } from 'react-router-dom';
import API_KEY from '../utils/API_KEY';
import { error } from '../constants/LocationSearch';
import useFetch from 'src/utils/useFetch';

export default function Locations() {
  const [searchParams] = useSearchParams();
  const searchInput = searchParams.get('q');
  const [locationArray, unexpectedError] = useFetch<LocationType[]>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`
  );
  const isLoading = !locationArray && !unexpectedError;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (unexpectedError) {
    return <>{error.unexpected}</>;
  }

  if (locationArray?.length === 0) {
    return <>{error.noCity}</>;
  }

  return (
    <ul className='locations'>
      {locationArray?.map(location => (
        <Location key={location.lat + location.lon} location={location} />
      ))}
    </ul>
  );
}
