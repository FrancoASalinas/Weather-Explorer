import { render, screen } from '@testing-library/react';
import LocationWeather from 'src/components/LocationWeather';
import { carousel } from 'src/constants/ForecastCarousel';
import forecastMock from 'src/mocks/forecastMock';
import userWeatherMock from 'src/mocks/userWeatherMock';

function setup() {
  render(
    <LocationWeather
      className=''
      isToggle={true}
      currentWeather={userWeatherMock}
      forecastData={forecastMock}
    />
  );
}

it('Should show the current city name', async () => {
  setup();
  await screen.findByText(userWeatherMock.name, {}, { timeout: 10000 });
});

it('Should render the forecast carousel', async () => {
  setup();
  await screen.findByTestId(carousel.testid);
});
