import { screen } from '@testing-library/react';
import { nav } from 'src/constants/Header';
import setup from 'src/tests/utils/routerSetup';
import userWeatherMock from 'src/mocks/userWeatherMock';
import { loadingIndicator } from 'src/constants/LoadingIndicator';

it(`Should render nav link: ${nav.currentLocation.text}`, async () => {
  setup();
  expect(
    (await screen.findAllByText(nav.currentLocation.text)).length
  ).toBeGreaterThan(0);
});

it(`Clicking the link should get user to the current location weather`, async () => {
  const { user } = setup('/map');
  await user.click((await screen.findAllByText(nav.currentLocation.text))[0]);

  await screen.findAllByText(userWeatherMock.name, {}, { timeout: 20000 });
}, 20000);

it('Should show a loading spinner when loading', async () => {
  setup();
  await screen.findByTestId(loadingIndicator.testid);
});