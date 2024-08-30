import { useState } from 'react';
import { Location as LocationType } from '../types';
import LocationWeather from './LocationWeather';
import { showWeatherButton } from '../constants/Location';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isToggle, setIsToggle] = useState(false);

  async function handleLocationClick() {
    setIsToggle(prev => !prev);
  }

  return (
    <div data-testid={lat + lon} className='locations__location'>
      <div
        className={`locations__location__main ${
          isToggle && 'locations__location__main--toggle'
        }`}
      >
        <div className='locations__location__name'>
          <span>
            {name}, {country}
          </span>
          {state && <span>{state}</span>}
        </div>
        <button
          className='locations__location__button'
          onClick={handleLocationClick}
          data-testid={showWeatherButton.testid}
        >
          {showWeatherButton.text}
        </button>
      </div>
      {isToggle && (
        <LocationWeather className='weather--location' coords={{ lat, lon }} />
      )}
    </div>
  );
}

export default Location;
