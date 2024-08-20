import { error } from 'src/constants/LocationSearch';
import { loadingIndicator } from 'src/constants/LoadingIndicator';
import { showWeatherButton } from 'src/constants/Location';
import locationDataMock from 'src/mocks/locationDataMock';
import weatherDataMock from 'src/mocks/weatherDataMock';
import assertLocationWeather from 'src/tests/utils/assertLocationWeather';
import setup from '../utils/routerSetup';
import { screen, within } from '@testing-library/dom';
import searchLocation from '../utils/searchLocation';
import { UserEvent } from '@testing-library/user-event';

it(`Should render ${error.noCity} if the city does not exist`, async () => {
  const { user } = setup();
  await searchLocation(user, 'nonexistent');

  await screen.findByText(error.noCity);
});

it(`Should render a loading spinner when fetching data`, async () => {
  const { user } = setup();
  await searchLocation(user, 'london');
  await screen.findByTestId(loadingIndicator.testid);
});

it(`Should render '${error.unexpected}' if there is an unexpected error fetching results`, async () => {
  const { user } = setup();
  await searchLocation(user, '!!!');
  await screen.findByText(error.unexpected);
});

it.each(locationDataMock)(
  'Should render name: $name, country: $country, state: $state if the city exists. Local names should not be rendered nor tested to',
  async data => {
    const { user } = setup();

    await searchLocation(user, 'london');

    for (const [key, entry] of Object.entries(data)) {
      key !== 'local_names' &&
        key !== 'lat' &&
        key !== 'lon' &&
        (await screen.findAllByText(entry, { exact: false }));
    }
  }
);

it.each(locationDataMock)(
  'Should not render latitude and longitude',
  async ({ lat, lon }) => {
    const { user } = setup();

    await searchLocation(user, 'london');

    const latitude = screen.queryByText(lat);
    expect(latitude).toBeNull();

    const longitude = screen.queryByText(lon);
    expect(longitude).toBeNull();
  }
);

it.each(locationDataMock)(
  `Should render buttons with testid: ${showWeatherButton.testid} for each location`,
  async ({ lat, lon }) => {
    const { user } = setup();
    await searchLocation(user, 'london');
    const location = await screen.findByTestId(lat + lon);
    await within(location).findByTestId(showWeatherButton.testid);
  }
);

async function getLocationElement(lat: number, lon: number) {
  return await screen.findByTestId(lat + lon);
}

it.each(locationDataMock)(
  `Should render a loading indicator with data-testid: ${loadingIndicator.testid} when clicking each location's button for showing it's weather`,
  async ({ lat, lon }) => {
    const { user } = setup();
    await searchLocation(user, 'london');
    const location = await getLocationElement(lat, lon);
    const showButton = await within(location).findByTestId(
      showWeatherButton.testid
    );
    await user.click(showButton);
    await within(location).findByTestId(
      loadingIndicator.testid,
      {},
      { timeout: 3000 }
    );
  }
);

const locationWithWeatherData = locationDataMock.map((location, index) => {
  const result = { ...location, ...weatherDataMock[index] };
  return result;
});

async function showLocationWeather(user: UserEvent, lat: number, lon: number) {
  await searchLocation(user, 'london');

  const location = await getLocationElement(lat, lon);
  const showButton = await within(location).findByTestId(
    showWeatherButton.testid
  );
  await user.click(showButton);

  return location;
}

it.each(locationWithWeatherData)(
  `Should render weather main, weather description, temp: $main.temp, feels like: $main.feels_like, min temp: $main.temp_min, max temp: $main.temp_max, humidity: $main.humidity, visibility: $visibility, wind speed: $wind.speed, wind direction: $wind.deg, clouds: $clouds.all`,
  async weatherData => {
    const { lat, lon } = weatherData;
    const { user } = setup();
    await showLocationWeather(user, lat, lon);

    await assertLocationWeather(weatherData);
  },
  20000
);

it.each(locationWithWeatherData)(
  'Should not render weather id',
  async ({ weather, lat, lon, main }) => {
    const { user } = setup();
    const location = await showLocationWeather(user, lat, lon);

    await within(location).findByText(main.temp, { exact: false });

    expect(
      within(location).queryByText(weather[0].id, { exact: false })
    ).toBeNull();
  }
);

it.each(locationWithWeatherData)(
  "Should hide location's weather data when clicking show button again",
  async ({ lat, lon, main }) => {
    const { user } = setup();
    await searchLocation(user, 'london');

    const location = await getLocationElement(lat, lon);
    const showButton = await within(location).findByText(
      showWeatherButton.text
    );

    await user.click(showButton);

    const temperature = main.temp;
    const weatherData = await within(location).findByText(temperature, {
      exact: false,
    });
    expect(weatherData).toBeDefined();

    await user.click(showButton);
    expect(screen.queryByText(temperature)).toBeNull();
  }
);
