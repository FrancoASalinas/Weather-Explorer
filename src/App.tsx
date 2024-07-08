import { useState, useEffect } from 'react';
import { error, map, nav } from './contents/App';
import API_KEY from './API_KEY';
import { Location } from './types';
import Locations from './components/Locations';
import L from 'leaflet';
import SearchBar from './components/Searchbar';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [locationArray, setLocationArray] = useState<Location[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleMap, setToggleMap] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

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

  const NavLinks = () => <a className={toggleMap ? 'header__nav__link--active' : 'header__nav__link'} onClick={() => {setToggleMap(true); setToggleNav(false)}}>{nav.map.text}</a>

  return (
    <>
      <header className='header'>
        <button
          className='header__bars'
          onClick={() => setToggleNav(prev => !prev)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
            <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
          </svg>
        </button>
        <nav className='header__nav--wide'>
          <NavLinks />
        </nav>
        <nav
          className={
            toggleNav ? 'header__nav--narrow--active' : 'header__nav--narrow'
          }
        >
          <NavLinks />
        </nav>
        <SearchBar
          onClick={handleClick}
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </header>
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
