import { useEffect, useState } from 'react';
import { Location as LocationType } from '../types';
import LoadingIndicator from './LoadingIndicator';
import Location from './Location';
import { useSearchParams } from 'react-router-dom';
import API_KEY from '../utils/API_KEY';
import { error } from '../constants/Locations';

export default function Locations() {
  const [locationArray, setLocationArray] = useState<LocationType[]>([]);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchInput = searchParams.get('q');

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        setUnexpectedError(true);
      })
      .then((data: LocationType[]) => {
        data && setLocationArray(data);
      })
      .then(() => {
        setIsSearched(true);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, [searchInput]);

  if (isLoading) {
    return <LoadingIndicator />;
  } else if (unexpectedError) {
    return <>{error.unexpected}</>;
  } else if (isSearched && locationArray.length === 0) {
    return <>{error.noCity}</>;
  } else if (isSearched) {
    return (
      <ul className='locations'>
        {locationArray.map(location => (
          <Location key={location.lat + location.lon} location={location} />
        ))}
      </ul>
    );
  }
}
