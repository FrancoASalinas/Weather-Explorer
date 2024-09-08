import { useState } from 'react';
import WindView from 'src/utils/WindView';
import Arrow from 'src/assets/icons/arrow.svg?react';

function WindDirection({ direction }: { direction: number }) {
  const [error, setError] = useState(false);

  function errorCallback(error: string) {
    console.error(error);
    setError(true);
  }

  const windDirection = new WindView(direction, errorCallback);

  return error ? undefined : (
    <div className='wind-direction-container'>
      <Arrow className={`arrow-icon arrow-icon--${windDirection.cardinal}`} />
      {windDirection.cardinal}
    </div>
  );
}

export default WindDirection;
