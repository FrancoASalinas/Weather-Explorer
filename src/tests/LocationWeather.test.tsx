import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LocationWeather from '../components/LocationWeather';
import userWeatherMock from '../mocks/userWeatherMock';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../utils/routes';
import { loadingIndicator } from '../constants/LoadingIndicator';

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
                title=''
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

it("Should have a button 'Past week'", async () => {
  setup();
  await screen.findByText('Past Week');
});

it("Should navigate to the location's weather history when clicking the button", async () => {
  const { user } = setup();
  const button = await screen.findByText('Past Week');
  await user.click(button);

  await screen.findByTestId('history');
});

it("Should navigate to the location's weather history when clicking the button", async () => {
  const { user } = setup();
  const button = await screen.findByText('Past Week');
  await user.click(button);

  await screen.findByTestId('history');
});

it('Should render the location name when clicking the button', async () => {
  const { user } = setup();
  const button = await screen.findByText('Past Week');
  await user.click(button);

  await screen.findByText(`${userWeatherMock.name} Weather History`);
});

it('Should render a loading spinner when clicking the button', async () => {
  const { user } = setup();
  const button = await screen.findByText('Past Week');
  await user.click(button);

  await screen.findByTestId(loadingIndicator.testid);
});
