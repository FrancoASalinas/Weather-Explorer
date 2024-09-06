import { useEffect, useRef, useState } from 'react';
import { Location as LocationType } from 'src/types';
import LocationWeather from 'src/components/LocationWeather';
import { showWeatherButton } from 'src/constants/Location';
import Angle from 'src/assets/icons/right-angle.svg?react';

function Location({ location }: { location: LocationType }) {
  const { lat, lon, name, country, state } = location;
  const [isToggle, setIsToggle] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function scrollIntoView() {
    if (ref?.current && ref.current.scrollIntoView && isToggle) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  useEffect(() => {
    scrollIntoView();
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
          <Angle />
        </button>
      </div>
      {isToggle && <LocationWeather coords={{ lat, lon }} />}
    </div>
  );
}

export default Location;
