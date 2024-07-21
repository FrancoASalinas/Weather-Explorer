import { useEffect, useState } from 'react';
import { map } from '../contents/InteractiveMap';
import L from 'leaflet';
import API_KEY from '../API_KEY';

function InteractiveMap() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
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

      setIsInitialized(true);
    }
  }, []);

  return (
    <div data-testid={map.testId} className='map-container' id='map'></div>
  );
}

export default InteractiveMap;
