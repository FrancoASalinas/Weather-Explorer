import { useEffect, useRef, useState } from 'react';
import { Location as LocationType } from '../types';
import LocationWeather from './LocationWeather';
import { showWeatherButton } from '../constants/Location';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isToggle, setIsToggle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current && ref.current.scrollIntoView && isToggle) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isToggle]);

  async function handleLocationClick() {
    setIsToggle(prev => !prev);
  }

  return (
    <div data-testid={lat + lon} className='locations__location' ref={ref}>
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
          className={
            isToggle
              ? 'locations__location__button--toggle'
              : 'locations__location__button'
          }
          onClick={handleLocationClick}
          data-testid={showWeatherButton.testid}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
            <path d='M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z' />
          </svg>
        </button>
      </div>
      {isToggle && (
        <LocationWeather className='weather--location' coords={{ lat, lon }} />
      )}
    </div>
  );
}

export default Location;
