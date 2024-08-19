import { render, screen } from '@testing-library/react';
import ForecastCarousel from 'src/components/ForecastCarousel';
import { card } from 'src/constants/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';

it('Should render 15 forecast cards', async () => {
  render(<ForecastCarousel forecastData={forecastMock} />);

  const cards = await screen.findAllByTestId(card.testid);

  expect(cards).toHaveLength(15);
});
