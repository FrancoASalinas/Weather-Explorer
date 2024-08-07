import { screen } from '@testing-library/react';
import { nav } from '../constants/Header';
import setup from './routerSetup';
import userWeatherMock from '../mocks/userWeatherMock';
import assertLocationWeather from './utils/assertLocationWeather';
import { loadingIndicator } from '../constants/LoadingIndicator';

it(`Should render nav link: ${nav.currentLocation.text}`, async () => {
  setup();
  expect(
    (await screen.findAllByText(nav.currentLocation.text)).length
  ).toBeGreaterThan(0);
});

it(`Clicking the link should get user to the current location weather`, async () => {
  const { user } = setup('/map');
  await user.click((await screen.findAllByText(nav.currentLocation.text))[0]);

  await screen.findAllByText(userWeatherMock.name, {}, { timeout: 10000 });
});

it("Should show the current city name for the user's current location", async () => {
  setup();
  await screen.findByText(userWeatherMock.name, {}, { timeout: 10000 });
});

it("Should show the current city weather for the user's current location", async () => {
  setup();
  await assertLocationWeather(userWeatherMock);
});

it('Should show a loading spinner when loading', async () => {
  setup();
  await screen.findByTestId(loadingIndicator.testid);
});
