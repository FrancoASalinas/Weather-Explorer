import { UserLocationData, WeatherData } from '../types';
import LocationWeather from './LocationWeather';
import API_KEY from '../utils/API_KEY';
import LoadingIndicator from './LoadingIndicator';
import useFetch from '../utils/useFetch';

function UserLocationWeather() {
  const userLocation: UserLocationData = useFetch('https://ipapi.co/json/');
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
          title={userWeather?.name}
        />
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}

export default UserLocationWeather;
