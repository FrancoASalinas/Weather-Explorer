import LocationWeather from '../components/LocationWeather';
import useUserLocation from '../utils/useUserLocation';

function UserLocationWeather() {
  const [userLocation, error] = useUserLocation();

  return (
    <>
      {userLocation ? (
        <LocationWeather
          className='weather--user'
          coords={{ lat: userLocation.latitude, lon: userLocation.longitude }}
        />
      ) : (
        error && <h2>Error: {error.message}</h2>
      )}
    </>
  );
}

export default UserLocationWeather;
