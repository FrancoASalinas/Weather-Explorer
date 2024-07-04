import { useState, useRef, useEffect } from 'react';
import { button, error, input, map, nav } from './contents/App';
import API_KEY from './API_KEY';
import { Location } from './types';
import Locations from './components/Locations';
import Leaflet from 'leaflet';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [locationArray, setLocationArray] = useState<Location[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (toggleMap) {
      const map =
        mapRef?.current &&
        Leaflet.map(mapRef.current, { center: [1, 1], zoom: 1 });

      map &&
        Leaflet.tileLayer(
          `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
          { maxZoom: 9 }
        ).addTo(map);
    }
  }, [toggleMap]);

  return (
    <>
      <header>
        <nav>
          <a onClick={() => setToggleMap(true)}>{nav.map.text}</a>
        </nav>
      </header>
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
        {toggleMap ? (
          <div
            data-testid={map.testId}
            className='map-container'
            ref={mapRef}
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
      .then((data: Location[]) => data && setLocationArray(data))
      .then(() => {
        setIsSearched(true);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }
}

export default App;
