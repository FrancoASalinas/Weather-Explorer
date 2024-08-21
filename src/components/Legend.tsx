import { Layer } from '../types';

function Legend({ layer }: { layer: Layer }) {
  const { id, unit, metrics } = layer;
  return (
    <div className='map-container__legend'>
      <div className={`map-container__legend__bar--${id}`}>
        <div className='map-container__legend__metric-unit'>{unit}</div>
      </div>
      <div className='map-container__legend__metrics'>
        {metrics.map(metric => (
          <div key={metric} className='map-container__legend__metrics__metric'>{metric}</div>
        ))}
      </div>
    </div>
  );
}

export default Legend