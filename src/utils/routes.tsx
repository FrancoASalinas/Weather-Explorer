import { Route, Routes } from 'react-router-dom';
import App from '../App';
import InteractiveMap from '../pages/InteractiveMap';
import Locations from '../pages/LocationSearch';
import UserLocationWeather from '../pages/UserLocationWeather';
import WeatherHistory from '../components/WeatherHistory';

const routes = (
  <Route path='/' element={<App />}>
    <Route index element={<UserLocationWeather />} />
    <Route path='map' element={<InteractiveMap />} />
    <Route path='search' element={<Locations />} />
    <Route path='history/:lat/:lon/:name' element={<WeatherHistory />} />
  </Route>
);
export default <Routes>{routes}</Routes>;

export { routes };
