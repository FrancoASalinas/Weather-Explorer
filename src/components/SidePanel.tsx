import { useState } from 'react';
import { Layer } from '../types';
import layers from '../utils/layers';

function SidePanel({
  layer,
  onChange,
}: {
  layer: Layer;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isToggle, setIsToggle] = useState<boolean>(true);

  return (
    <div
      className={`map-container__side-panel--${
        isToggle ? 'active' : 'unactive'
      }`}
    >
      <h3 className='side-panel__title'>Select map</h3>
      <button
        className='side-panel__toggle'
        onClick={() => setIsToggle(prev => !prev)}
      >
        <svg
          className={`toggle${isToggle ? '--active' : ''}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 320 512'
        >
          <path d='M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z' />
        </svg>
      </button>
      {layers.map(({ name }) => (
        <CustomRadioInput
          key={name}
          isChecked={layer.name === name}
          name={name}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

function CustomRadioInput({
  name,
  isChecked,
  onChange,
}: {
  name: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label htmlFor={name} className='custom-label'>
      <input
        className='radio-button'
        type='radio'
        id={name}
        checked={isChecked}
        onChange={onChange}
        value={name}
      ></input>
      <span className='custom-radio-button'></span>
      <span className='custom-label__name'>{name}</span>
    </label>
  );
}

export default SidePanel;
