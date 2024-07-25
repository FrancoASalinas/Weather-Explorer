import ReactDOM from 'react-dom/client';
import './index.css';
import {
  HashRouter,
} from 'react-router-dom';
import routes from './routes.tsx';

const router = <HashRouter>{routes}</HashRouter>;

ReactDOM.createRoot(document.getElementById('root')!).render(router);
