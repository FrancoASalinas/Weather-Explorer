import { loadingIndicator } from 'src/constants/LoadingIndicator';
import { showWeatherButton } from 'src/constants/Location';
import locationDataMock from 'src/mocks/locationDataMock';
import setup from '../utils/routerSetup';
import { screen, within } from '@testing-library/dom';
import searchLocation from '../utils/searchLocation';

it.each(locationDataMock)(
  'Should render name: $name, country: $country, state: $state if the city exists',
  async data => {
    const { user } = setup();

    await searchLocation(user, 'london');

    for (const [key, entry] of Object.entries(data)) {
      key !== 'local_names' &&
        key !== 'lat' &&
        key !== 'lon' &&
        (await screen.findAllByText(entry.toString(), { exact: false }, {timeout: 20000}));
    }
  }
, 25000);

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
