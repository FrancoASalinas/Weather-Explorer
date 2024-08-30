import { error } from 'src/constants/LocationSearch';
import setup from '../utils/routerSetup';
import searchLocation from '../utils/searchLocation';
import { screen } from '@testing-library/dom';
import { loadingIndicator } from 'src/constants/LoadingIndicator';

it(`Should render ${error.noCity} if the city does not exist`, async () => {
  const { user } = setup();
  await searchLocation(user, 'nonexistent');

  await screen.findByText(error.noCity, {}, { timeout: 10000 });
}, 15000);

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
