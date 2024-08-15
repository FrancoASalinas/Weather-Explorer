import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationWeather from '../components/LocationWeather';
import userWeatherMock from '../mocks/userWeatherMock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../utils/routes';

function setup() {
  return {
    user: userEvent,
    ...render(
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          {routes}
          <Route
            path='/test'
            element={
              <LocationWeather
                className=''
                isToggle={true}
                currentWeather={userWeatherMock}
                lat={53.2}
                lon={23}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    ),
  };
}

it('Should show the current city name', async () => {
  setup();
  await screen.findByText(userWeatherMock.name, {}, { timeout: 10000 });
});

it('Should render the forecast carousel', async () => {
  setup();
  await screen.findByTestId('forecast-carousel');
});
