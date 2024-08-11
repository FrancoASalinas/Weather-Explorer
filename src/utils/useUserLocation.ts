import { useEffect, useState } from 'react';
import { UserLocationData } from '../types';

function useUserLocation() {
  const [position, setPosition] = useState<UserLocationData>();
  const [error, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    if (!position) {
      navigator.geolocation.getCurrentPosition(
        position => setPosition(position.coords),
        error => setError(error)
      );
    }
  }, [position, error]);

  console.log(position);
  console.log(error);

  return [position, error] as const;
}

export default useUserLocation;
