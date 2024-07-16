import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import routes from './routes.tsx';

const router = createBrowserRouter(createRoutesFromElements(routes), {
  basename: '/Weather-Explorer',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
