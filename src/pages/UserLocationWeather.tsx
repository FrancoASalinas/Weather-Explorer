import { WeatherData } from '../types';
import LocationWeather from '../components/LocationWeather';
import API_KEY from '../utils/API_KEY';
import LoadingIndicator from '../components/LoadingIndicator';
import useFetch from '../utils/useFetch';
import useUserLocation from '../utils/useUserLocation';

function UserLocationWeather() {
  const [userLocation, error] = useUserLocation();
  const userWeather: WeatherData = useFetch(
    userLocation
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=${API_KEY}&units=metric`
      : null
  );

  return (
    <>
      {userLocation && userWeather ? (
        <LocationWeather
          lat={userLocation.latitude}
          lon={userLocation.longitude}
          isToggle={true}
          className='weather--user'
          currentWeather={userWeather}
        />
      ) : error ? (
        <h2>Error: {error.message}</h2>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

export default UserLocationWeather;
