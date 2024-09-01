import { screen } from '@testing-library/react';
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
  return componentSetup(<LocationWeather className='' coords={{ lat, lon }} />);
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
  await screen.findByTestId(carousel.testid, {}, { timeout: 20000 });
}, 30000);

it(`Should render weather`, async () => {
  setup();

  await assertLocationWeather(forecastDataMock.current);
}, 30000);

it.each(forecastDataMock.daily)(
  'Should render the weather for the selected card',
  async ({
    precipitation_probability_max,
    temperature_max,
    time,
    wind_direction,
    wind_speed,
    units,
    isToday,
  }) => {
    const { user } = setup();
    const card = await screen.findByText(time, {}, { timeout: 20000 });

    await user.click(card);

    await screen.findByText(
      `${
        isToday
          ? forecastDataMock.current.precipitation_probability
          : precipitation_probability_max
      }${units.precipitation_probability_max}`,
      {},
      { timeout: 20000 }
    );
    await screen.findByText(
      `${isToday ? forecastDataMock.current.main.temp : temperature_max}ºC`,
      {},
      { timeout: 20000 }
    );
    await screen.findByText(
      `${isToday ? forecastDataMock.current.wind.deg : wind_direction}º`,
      {},
      { timeout: 20000 }
    );
    await screen.findByText(
      `${isToday ? forecastDataMock.current.wind.speed : wind_speed}${
        units.wind_speed_10m_max
      }`,
      {},
      { timeout: 20000 }
    );
  },
  24000
);
