import App from '../App';
import {
  input as appInput,
  error,
  button as appButton,
  loadingIndicator,
  showWeatherButton,
} from '../contents/App';
import { render, screen, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { server } from '../mocks/mockServer';
import locationDataMock from '../mocks/locationDataMock';
import weatherDataMock from '../mocks/weatherDataMock';
import '@testing-library/jest-dom';

function setup() {
  return {
    user: userEvent.setup(),
    ...render(<App />),
  };
}

async function typeOnInput(user: UserEvent, input: string) {
  await user.type(screen.getByPlaceholderText(appInput.placeholder), input);
}

async function searchLocation(user: UserEvent, input: string) {
  await typeOnInput(user, input);

  await user.click(screen.getByText(appButton.text));
}

function getSearchButton() {
  return screen.getByText(appButton.text);
}

beforeAll(() => server.listen());

it(`Should render an input with placeholder ${appInput.placeholder}`, () => {
  setup();
  screen.getByPlaceholderText(appInput.placeholder);
});

it(`Should render a button with text ${appButton.text}`, () => {
  setup();
  getSearchButton();
});

describe('Search button', () => {
  it('Should be disabled if input is empty', async () => {
    setup();
    expect(getSearchButton()).toBeDisabled();
  });

  it('Should be disabled if input has whitespaces only', async () => {
    const { user } = setup();
    await typeOnInput(user, '    \n  ');
    expect(getSearchButton()).toBeDisabled();
  });
});
describe('Searching', () => {
  it(`Should render '${error.unexpected}' if there is an unexpected error fetching results`, async () => {
    const { user } = setup();
    await searchLocation(user, '!!!');
    await screen.findByText(error.unexpected);
  });

  it(`Should render ${error.noCity} if the city does not exist`, async () => {
    const { user } = setup();
    await searchLocation(user, 'nonexistent');

    await screen.findByText(error.noCity);
  });

  it(`Should render a loading indicator with testid: ${loadingIndicator.testid} when fetching data`, async () => {
    const { user } = setup();
    await searchLocation(user, 'london');
    await screen.findByTestId(loadingIndicator.testid);
  });

  it.each(locationDataMock)(
    'Should render name: $name, latitude: $lat, longitude: $lon, country: $country, state: $state if the city exists. Local names should not be rendered nor tested to',
    async data => {
      const { user } = setup();

      await searchLocation(user, 'london');

      for (let [key, entry] of Object.entries(data)) {
        key !== 'local_names' && (await screen.findAllByText(entry));
      }
    }
  );
});

describe("Location's weather", () => {
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

  async function clickShowWeatherButton(
    user: UserEvent,
    locationElement: HTMLElement
  ) {
    await user.click(
      await within(locationElement).findByTestId(showWeatherButton.testid)
    );
  }

  it.each(locationDataMock)(
    `Should render a loading indicator with data-testid: ${loadingIndicator.testid} when clicking each location's button for showing it's weather`,
    async ({ lat, lon }) => {
      const { user } = setup();
      await searchLocation(user, 'london');
      const location = await getLocationElement(lat, lon);
      await clickShowWeatherButton(user, location);
      await within(location).findByTestId(loadingIndicator.testid);
    }
  );

  const locationWithWeatherData = locationDataMock.map((location, index) => {
    const result = { ...location, ...weatherDataMock[index] };
    return result;
  });

  it.only.each(locationWithWeatherData)(
    `Should render weather main, weather description, temp: $main.temp, feels like: $main.feels_like, min temp: $main.temp_min, max temp: $main.temp_max, humidity: $main.humidity, visibility: $visibility, wind speed: $wind.speed, wind direction: $wind.deg, clouds: $clouds.all, rain past hour: $rain.1h, snow past hour: $snow.1h`,
    async ({
      weather,
      main,
      visibility,
      wind,
      clouds,
      rain,
      snow,
      lat,
      lon,
    }) => {
      const { user } = setup();
      await searchLocation(user, 'london');

      const location = await getLocationElement(lat, lon);
      await clickShowWeatherButton(user, location);

      await within(location).findByText(weather[0].main);
      await within(location).findByText(weather[0].description);
      await within(location).findAllByText(main.temp);
      await within(location).findByText(main.temp_max);
      await within(location).findByText(main.temp_min);
      await within(location).findByText(main.humidity);
      visibility && (await within(location).findByText(visibility));
      await within(location).findAllByText(main.feels_like);
      await within(location).findByText(wind.speed);
      await within(location).findByText(wind.deg);
      await within(location).findByText(clouds.all);
      rain && rain['1h'] && (await within(location).findByText(rain['1h']));
      snow && snow['1h'] && (await within(location).findByText(snow['1h']));
    }
  );
}, 10000);
