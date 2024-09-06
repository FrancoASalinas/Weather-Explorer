import LocationWeather from '../components/LocationWeather';
import useUserLocation from '../utils/useUserLocation';

function UserLocationWeather() {
  const [userLocation, error] = useUserLocation();

  return (
    <div className='user-location'>
      {userLocation ? (
        <LocationWeather
        coords={{ lat: userLocation.latitude, lon: userLocation.longitude }}
        />
      ) : (
        error && <h2>Error: {error.message}</h2>
      )}
      </div>
  );
}

export default UserLocationWeather;
