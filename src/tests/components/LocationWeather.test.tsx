import { screen } from '@testing-library/react';
import LocationWeather from 'src/components/LocationWeather';
import { carousel } from 'src/constants/ForecastCarousel';
import locationDataMock from 'src/mocks/locationDataMock';
import componentSetup from '../utils/componentSetup';
import assertLocationWeather from '../utils/assertLocationWeather';
import transformForecastData from 'src/utils/transformForecastData';
import forecastMock from 'src/mocks/forecastMock';

function setup({ lat, lon }: { lat: number; lon: number }) {
  return componentSetup(<LocationWeather className='' coords={{ lat, lon }} />);
}

const weatherDataMock = transformForecastData(
  forecastMock,
  locationDataMock[0]
).current;

it('Should show the city name', async () => {
  const { lat, lon, name } = locationDataMock[0];
  setup({ lat, lon });
  await screen.findByText(name, {}, { timeout: 30000 });
}, 40000);

it('Should render the forecast carousel', async () => {
  const { lat, lon } = locationDataMock[0];
  setup({ lat, lon });
  await screen.findByTestId(carousel.testid, {}, { timeout: 20000 });
}, 30000);

it(`Should render weather`, async () => {
  const { lat, lon } = locationDataMock[0];
  setup({ lat, lon });

  await assertLocationWeather(weatherDataMock);
}, 30000);
