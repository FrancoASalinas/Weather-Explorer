import { fireEvent, screen } from '@testing-library/react';
import LocationWeather from 'src/components/LocationWeather';
import { carousel } from 'src/constants/ForecastCarousel';
import locationDataMock from 'src/mocks/locationDataMock';
import componentSetup from '../utils/componentSetup';
import assertLocationWeather from '../utils/assertLocationWeather';
import transformForecastData from 'src/utils/transformForecastData';
import forecastMock from 'src/mocks/forecastMock';

function setup(
  coords = { lat: locationDataMock[0].lat, lon: locationDataMock[0].lon }
) {
  const { lat, lon } = coords;
  return componentSetup(<LocationWeather coords={{ lat, lon }} />);
}

async function loadBackgroundImage() {
  fireEvent.load(
    await screen.findByTestId(
      'weather-background-image',
      {},
      { timeout: 10000 }
    )
  );
}

const forecastDataMock = transformForecastData(
  forecastMock,
  locationDataMock[0]
);

it('Should show the city name', async () => {
  const { name } = locationDataMock[0];
  setup();
  await screen.findByText(name, {}, { timeout: 30000 });
}, 40000);

it('Should render the forecast carousel', async () => {
  setup();
  await loadBackgroundImage();
  await screen.findByTestId(carousel.testid, {}, { timeout: 20000 });
}, 30000);

it(`Should render weather`, async () => {
  setup();

  await assertLocationWeather(forecastDataMock.current);
}, 30000);

it('Should render the weather for every selected card', async () => {
  const { user } = setup();

  await loadBackgroundImage();

  for (let {
    precipitation_probability_max,
    temperature_max,
    time,
    wind_speed,
    isToday,
  } of forecastDataMock.daily) {
    const card = await screen.findByText(time);
    await user.click(card);
    console.log(`clicked card with date: ${time}`);

    await screen.findByText(
      isToday
        ? forecastDataMock.current.precipitation_probability
        : precipitation_probability_max
    );
    await screen.findAllByText(
      isToday ? forecastDataMock.current.main.temp : temperature_max
    );
    await screen.findByText(
      isToday ? forecastDataMock.current.wind.speed : wind_speed
    );
  }
}, 30000);

it('Should render a button to show the hourly data', async () => {
  setup();
  await screen.findByTestId('chart-button', {}, {timeout: 30000});
}, 30000);