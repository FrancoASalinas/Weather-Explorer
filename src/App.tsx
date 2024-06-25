import { useState } from 'react';
import { button, error, input } from './contents/App';
import API_KEY from './API_KEY';
import { WeatherData, Location } from './types';
import Locations from './components/Locations';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [locationArray, setLocationArray] = useState<Location[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className='location-search'>
      <div className='location-search__search-controls'>
        <input
          className='location-search__search-controls__input'
          type='text'
          placeholder={input.placeholder}
          onChange={e => setSearchInput(e.target.value.trim())}
        />
        <button
          disabled={searchInput === ''}
          onClick={handleClick}
          className='location-search__search-controls__button'
        >
          {button.text}
        </button>
      </div>
      <Locations
        onClick={handleLocationClick}
        error={error}
        isLoading={isLoading}
        isSearched={isSearched}
        locationArray={locationArray}
        unexpectedError={unexpectedError}
      />
    </main>
  );

  async function handleClick() {
    setIsLoading(true);

    await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        setUnexpectedError(true);
      })
      .then(
        (data: Location[]) =>
          data &&
          setLocationArray(
            data.map(location => {
              location.isLoadingWeather = false;
              return location;
            })
          )
      )
      .then(() => {
        setIsSearched(true);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }

  async function handleLocationClick(locationLat: number, locationLon: number) {
    console.log('click');
    isLoading(true);

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationLat}&lon=${locationLon}&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then((data: WeatherData) => transformLocation(data));

    isLoading(false);

    function isLoading(value: boolean) {
      setLocationArray(prev =>
        prev.map(location => {
          if (location.lat === locationLat && location.lon === locationLon) {
            location.isLoadingWeather = value;
            return location;
          }
          return location;
        })
      );
    }

    function transformLocation(data: WeatherData) {
      setLocationArray(prev =>
        prev.map(location => {
          if (location.lat === locationLat && location.lon === locationLon) {
            location.currentWeather = data;
            location.isLoadingWeather = false;
            return location;
          }
          return location;
        })
      );
    }
  }
}

export default App;
