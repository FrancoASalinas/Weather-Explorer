import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import routes from 'src/utils/routes';
import { mapContent } from 'src/constants/InteractiveMap';
import { locationName } from '../utils/mockGeolocation';

function setup(initialEntry: string) {
  render(<MemoryRouter initialEntries={[initialEntry]}>{routes}</MemoryRouter>);
}

describe('/', () => {
  it("Should render user's location weather", async () => {
    setup('/');
    await screen.findByText(locationName, {}, { timeout: 10000 });
  });
});

describe('/map', () => {
  it('Should render interactive map', async () => {
    setup('/map');
    await screen.findByTestId(mapContent.testId);
  });
});

describe('/search?q=london', () => {
  it('Should render the searched locations', async () => {
    setup('/search?q=london');
    await screen.findAllByText(/London/, {}, { timeout: 10000 });
  }, 11000);
});
