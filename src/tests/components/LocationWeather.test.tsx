import { render, screen } from '@testing-library/react';
import LocationWeather from 'src/components/LocationWeather';
import userWeatherMock from 'src/mocks/userWeatherMock';

function setup() {
  render(
    <LocationWeather
      className=''
      isToggle={true}
      currentWeather={userWeatherMock}
      lat={53.2}
      lon={23}
    />
  );
}

it('Should show the current city name', async () => {
  setup();
  await screen.findByText(userWeatherMock.name, {}, { timeout: 10000 });
});

it('Should render the forecast carousel', async () => {
  setup();
  await screen.findByTestId('forecast-carousel');
});
