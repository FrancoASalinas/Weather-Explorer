import { useEffect, useState } from 'react';
import { map as mapContent } from '../contents/InteractiveMap';
import L from 'leaflet';
import API_KEY from '../API_KEY';
import layers from '../utils/layers';
import { Layer } from '../types';
import Legend from './Legend';
import SidePanel from './SidePanel';

function InteractiveMap() {
  const [layer, setLayer] = useState<Layer>(layers[0]);
  const [map, setMap] = useState<L.Map>();
  const [currentLayer, setCurrentLayer] = useState<L.Layer>();

  function initializeMap() {
    const newMap = L.map('map', { center: [15, 15], zoom: 3 });
    setMap(newMap);
  }
  function createWeatherLayer() {
    const newLayer =
      map &&
      L.tileLayer(
        `https://tile.openweathermap.org/map/${layer.urlString}/{z}/{x}/{y}.png?appid=${API_KEY}`,
        { maxZoom: 9 }
      ).addTo(map);

    setCurrentLayer(newLayer);
    return newLayer;
  }

  useEffect(() => {
    if (map && currentLayer) {
      map.removeLayer(currentLayer);
      createWeatherLayer();
    } else if (!map) {
      initializeMap();
    } else if (map) {
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const newLayer = createWeatherLayer();
      setCurrentLayer(newLayer);
    }
  }, [layer, map]);

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
