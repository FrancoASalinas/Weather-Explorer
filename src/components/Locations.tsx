import { Location as LocationType } from '../types';
import LoadingIndicator from './LoadingIndicator';
import Location from './Location';

type Props = {
  isLoading: boolean;
  unexpectedError: boolean;
  isSearched: boolean;
  locationArray: LocationType[];
  error: { [key: string]: string };
};

export default function Locations({
  error,
  isLoading,
  isSearched,
  locationArray,
  unexpectedError,
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
      {locationArray.map(location => (
        <Location key={location.lat + location.lon} location={location} />
      ))}
    </ul>
  );
}
