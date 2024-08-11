import { useEffect, useState } from 'react';
import L from 'leaflet';
import API_KEY from '../utils/API_KEY';
import { Layer } from '../types';

function useMap(initialLayer: Layer) {
  const [map, setMap] = useState<L.Map>();
  const [layer, setLayer] = useState<Layer>(initialLayer);
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

  return [layer, setLayer] as const;
}

export default useMap;
