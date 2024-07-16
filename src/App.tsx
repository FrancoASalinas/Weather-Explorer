import { useState, useEffect } from 'react';
import { error, map } from './contents/App';
import API_KEY from './API_KEY';
import { Location } from './types';
import Locations from './components/Locations';
import L from 'leaflet';
import Header from './components/Header';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [locationArray, setLocationArray] = useState<Location[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);

  useEffect(() => {
    if (toggleMap) {
      const map = L.map('map', { center: [0, 0], zoom: 1 });

      map &&
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          tileSize: 212,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

      map &&
        L.tileLayer(
          `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
          { maxZoom: 9 }
        ).addTo(map);
    }
  }, [toggleMap]);

  async function handleSearch() {
    setToggleMap(false);
    setIsLoading(true);

    await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        setUnexpectedError(true);
      })
      .then((data: Location[]) => data && setLocationArray(data))
      .then(() => {
        setIsSearched(true);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <Header
        onSearch={handleSearch}
        onLinkClick={() => {
          setToggleMap(true);
        }}
        toggleMap={toggleMap}
        onChange={e => setSearchInput(e.target.value)}
        inputValue={searchInput}
      />
      <main className='location-search'>
        {toggleMap ? (
          <div
            data-testid={map.testId}
            className='map-container'
            id='map'
          ></div>
        ) : (
          <Locations
            error={error}
            isLoading={isLoading}
            isSearched={isSearched}
            locationArray={locationArray}
            unexpectedError={unexpectedError}
          />
        )}
      </main>
    </>
  );
}

export default App;
