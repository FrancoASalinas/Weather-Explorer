import ReactDOM from 'react-dom/client';
import './index.css';
import {
  HashRouter,
} from 'react-router-dom';
import routes from './utils/routes';

const router = <HashRouter>{routes}</HashRouter>;

ReactDOM.createRoot(document.getElementById('root')!).render(router);
