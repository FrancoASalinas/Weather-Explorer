import { useEffect, useState } from 'react';
import { UserLocationData, WeatherData } from '../types';
import LocationWeather from './LocationWeather';
import API_KEY from '../API_KEY';

export const testId = 'user-location';

function UserLocationWeather() {
  const [userLocationData, setUserLocationData] = useState<UserLocationData>();
  const [userWeatherData, setUserWeatherData] = useState<WeatherData>();

  useEffect(() => {
    async function fetchUserLocation() {
      await fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          setUserLocationData({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        })
        .catch(err => console.error(err));
    }

    fetchUserLocation();
  }, []);

  useEffect(() => {
    async function fetchUserWeather() {
      userLocationData &&
        (await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${userLocationData.latitude}&lon=${userLocationData.longitude}&appid=${API_KEY}&units=metric`
        )
          .then(res => res.json())
          .then(data => setUserWeatherData(data))
          .catch(err => console.error(err)));
    }

    if (userLocationData) {
      fetchUserWeather();
    }
  }, [userLocationData]);

  return (
    <>
      <h3 className='user-city-name'>{userWeatherData?.name}</h3>
      {userWeatherData ? (
        <div className='user-city-container' data-testid={testId}>
          <LocationWeather isToggle={true} currentWeather={userWeatherData} />
        </div>
      ) : (
        'loading'
      )}
    </>
  );
}

export default UserLocationWeather;
