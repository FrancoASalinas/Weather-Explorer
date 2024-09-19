import { mapContent } from 'src/constants/InteractiveMap';
import { nav } from 'src/constants/Header';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserEvent } from '@testing-library/user-event';
import setup from 'src/tests/utils/routerSetup';
import searchLocation from '../utils/searchLocation';

async function clickMapLink(user: UserEvent) {
  const link = screen.getAllByText(nav.map.text)[0];
  await user.click(link);
}

it(`Should render '${nav.map.text}'`, () => {
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
}, 20000);

it('Should render the interactive map element when clicking the link', async () => {
  const { user } = setup();

  await clickMapLink(user);

  await screen.findByTestId(mapContent.testId, {}, { timeout: 10000 });
}, 11000);

it('Should stop showing the interactive map if the user searches for a location', async () => {
  const { user } = setup();

  await clickMapLink(user);

  await screen.findByTestId(mapContent.testId, {}, { timeout: 10000 });

  await searchLocation(user, 'london');

  expect(screen.queryByTestId(mapContent.testId)).toBeNull();
});

it('Should not show any search result when navigating to the map', async () => {
  const { user } = setup();
  await searchLocation(user, 'london');
  await screen.findAllByText(/London/);

  await clickMapLink(user);

  expect(screen.queryAllByText(/London/)).toHaveLength(0);
});
