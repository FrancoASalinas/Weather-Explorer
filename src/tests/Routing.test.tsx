import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import routes from '../routes';
import userWeather from '../mocks/userWeatherMock';
import { map } from '../contents/InteractiveMap';

function setup(initialEntry: string) {
  render(<MemoryRouter initialEntries={[initialEntry]}>{routes}</MemoryRouter>);
}

describe('/', () => {
  it("Should render user's location weather", async () => {
    setup('/');
    await screen.findByText(userWeather.name, {}, { timeout: 10000 });
  });
});

describe('/map', () => {
  it('Should render interactive map', async () => {
    setup('/map');
    await screen.findByTestId(map.testId);
  });
});

describe('/search?q=london', () => {
  it('Should render interactive map', async () => {
    setup('/search?q=london');
    await screen.findAllByText(/London/, {}, { timeout: 10000 });
  }, 11000);
});
