import layers from '../utils/layers';
import Legend from '../components/Legend';
import SidePanel from '../components/SidePanel';
import { mapContent } from '../constants/InteractiveMap';
import useMap from '../utils/useMap';

function InteractiveMap() {
  const [layer, setLayer] = useMap(layers[0]);

  return (
    <div className='map-wrapper'>
      <div
        data-testid={mapContent.testId}
        className='map-wrapper__map-container'
        id='map'
      >
        <Legend layer={layer} />
        <SidePanel
          layer={layer}
          onChange={e =>
            setLayer(layers.filter(layer => layer.name === e.target.value)[0])
          }
        />
      </div>
    </div>
  );
}

export default InteractiveMap;
