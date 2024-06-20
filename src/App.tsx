import { useState } from 'react';
import {
  button,
  error,
  input,
  loadingIndicator,
  showWeatherButton,
} from './contents/App';
import API_KEY from './API_KEY';
import { WeatherData, Location } from './types';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [locationArray, setLocationArray] = useState<Location[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LoadingIndicator = () => (
    <span data-testid={loadingIndicator.testid}>loading...</span>
  );

  return (
    <>
      <input
        type='text'
        placeholder={input.placeholder}
        onChange={e => setSearchInput(e.target.value.trim())}
      />
      <button disabled={searchInput === ''} onClick={handleClick}>
        {button.text}
      </button>
      {populateLocations()}
    </>
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

  function populateLocations() {
    if (isLoading) {
      return <LoadingIndicator />;
    } else if (unexpectedError) {
      return error.unexpected;
    } else if (isSearched && locationArray.length === 0) {
      return error.noCity;
    }

    return locationArray.map(
      ({
        lat,
        lon,
        name,
        country,
        state,
        isLoadingWeather,
        currentWeather,
      }) => (
        <li key={lat + lon} data-testid={lat + lon}>
          <ul>
            <li>{name}</li>
            <li>{lat}</li>
            <li>{lon}</li>
            <li>{country}</li>
            {state && <li>{state}</li>}
            <button
              onClick={() => handleLocationClick(lat, lon)}
              data-testid={showWeatherButton.testid}
            >
              Show weather
            </button>
          </ul>
          <ul>{populateLocationWeather(isLoadingWeather, currentWeather)}</ul>
        </li>
      )
    );

    function populateLocationWeather(
      isLoadingWeather: boolean | undefined,
      currentWeather: Location['currentWeather']
    ) {
      if (isLoadingWeather) {
        return <LoadingIndicator />;
      } else if (currentWeather !== undefined) {
        const result = [];
        const { weather, main, visibility, wind, clouds, rain, snow } =
          currentWeather;
        const weatherInfo = Array<any>(
          weather[0],
          main,
          { visibility },
          wind,
          clouds,
          rain,
          snow
        );

        for (let record of weatherInfo) {
          record && result.push(createListsFromRecord(record));
        }

        return result;

        function createListsFromRecord(record: { any: any }) {
          return Object.entries(record).map(([key, value]) => (
            <li key={key + value}>{value}</li>
          ));
        }
      }
    }
  }
}

export default App;
