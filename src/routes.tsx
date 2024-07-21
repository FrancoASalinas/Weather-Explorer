import { Route } from 'react-router-dom';
import App from './App';
import InteractiveMap from './components/InteractiveMap';
import Locations from './components/Locations';
import UserLocationWeather from './components/UserLocationWeather';

export default (
  <Route path='/' element={<App />}>
    <Route index element={<UserLocationWeather />} />
    <Route path='map' element={<InteractiveMap />} />
    <Route path='search' element={<Locations />} />
  </Route>
);
