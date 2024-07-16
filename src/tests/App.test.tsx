import { error, nav, map } from '../contents/App';
import { input as appInput, button as appButton } from '../contents/Searchbar';
import { loadingIndicator } from '../contents/LoadingIndicator';
import { showWeatherButton } from '../contents/Location';
import { render, screen, within } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { server } from '../mocks/mockServer';
import locationDataMock from '../mocks/locationDataMock';
import weatherDataMock from '../mocks/weatherDataMock';
import '@testing-library/jest-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import routes from '../routes';

function setup() {
  return {
    user: userEvent.setup(),
    ...render(
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
    ),
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

async function clickMapLink(user: UserEvent) {
  const link = screen.getAllByText(nav.map.text)[0];
  await user.click(link);
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
    'Should render name: $name, country: $country, state: $state if the city exists. Local names should not be rendered nor tested to',
    async data => {
      const { user } = setup();

      await searchLocation(user, 'london');

      for (let [key, entry] of Object.entries(data)) {
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

  async function showLocationWeather(
    user: UserEvent,
    lat: number,
    lon: number
  ) {
    await searchLocation(user, 'london');

    const location = await getLocationElement(lat, lon);
    const showButton = await within(location).findByTestId(
      showWeatherButton.testid
    );
    await user.click(showButton);

    return location;
  }

  it.each(locationWithWeatherData)(
    `Should render weather main, weather description, temp: $main.temp, feels like: $main.feels_like, min temp: $main.temp_min, max temp: $main.temp_max, humidity: $main.humidity, visibility: $visibility, wind speed: $wind.speed, wind direction: $wind.deg, clouds: $clouds.all, rain past hour: $rain.1h, snow past hour: $snow.1h`,
    async ({ weather, main, visibility, wind, lat, lon }) => {
      const { user } = setup();

      const location = await showLocationWeather(user, lat, lon);

      await within(location).findByText(
        `${weather[0].main} (${weather[0].description})`
      );

      await within(location).findByText(`Temperature`);
      await within(location).findByText(`${main.temp}ºC`);
      await within(location).findByText(`Max: ${main.temp_max}ºC`);
      await within(location).findByText(`Min: ${main.temp_min}ºC`);
      await within(location).findAllByText(`Feels like: ${main.feels_like}ºC`);

      await within(location).findByText('Humidity');
      await within(location).findByText(`${main.humidity}%`);

      if (visibility) {
        await within(location).findByText('Visibility');
        await within(location).findByText(`${visibility / 1000}km`);
      }

      await within(location).findByText('Wind');
      await within(location).findByText(`Speed: ${wind.speed}m/s`);
      await within(location).findByText(`Direction: ${wind.deg}º`);
    }
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
}, 10000);

describe('Navigation', () => {
  describe('Interactive Map', () => {
    it(`Should render \'${nav.map.text}\'`, () => {
      setup();
      screen.getAllByText(nav.map.text);
    });

    it('Should not render any search result when clicking the link', async () => {
      const { user } = setup();
      const link = screen.getAllByText(nav.map.text)[0];

      await searchLocation(user, 'london');

      await screen.findAllByText(/London/);

      await user.click(link);
      expect(screen.queryByText(/london/)).toBeNull();
    });

    it('Should render the interactive map element when clicking the link', async () => {
      const { user } = setup();

      await clickMapLink(user);

      await screen.findByTestId(map.testId);
    });

    it('Should stop showing the interactive map if the user searches for a location', async () => {
      const { user } = setup();

      await clickMapLink(user);

      await screen.findByTestId(map.testId);

      await searchLocation(user, 'london');

      expect(screen.queryByTestId(map.testId)).toBeNull();
    });
  });
});
