import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import routes from '../utils/routes';

function setup(route?: string) {
  return {
    user: userEvent.setup(),
    ...render(
      <MemoryRouter initialEntries={[route ? route : '/']}>
        {routes}
      </MemoryRouter>
    ),
  };
}

export default setup;
