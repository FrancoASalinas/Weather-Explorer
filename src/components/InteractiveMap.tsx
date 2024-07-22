import { useEffect, useState } from 'react';
import { map } from '../contents/InteractiveMap';
import L from 'leaflet';
import API_KEY from '../API_KEY';

function InteractiveMap() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const map = L.map('map', { center: [15, 15], zoom: 3 });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 9,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
        { maxZoom: 9 }
      ).addTo(map);

      setIsInitialized(true);
    }
  }, []);

  return (
    <div data-testid={map.testId} className='map-container' id='map'>
      <div className='map-container__legend'>
        <div className='map-container__legend__bar'>
        <div className='map-container__legend__metric-type'>ºC</div>
        </div>
        <div className='map-container__legend__metrics'>
          <div className='map-container__legend__metrics__metric'>-40</div>
          <div className='map-container__legend__metrics__metric'>-30</div>
          <div className='map-container__legend__metrics__metric'>-20</div>
          <div className='map-container__legend__metrics__metric'>-10</div>
          <div className='map-container__legend__metrics__metric'>0</div>
          <div className='map-container__legend__metrics__metric'>10</div>
          <div className='map-container__legend__metrics__metric'>20</div>
          <div className='map-container__legend__metrics__metric'>25</div>
          <div className='map-container__legend__metrics__metric'>30</div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMap;
