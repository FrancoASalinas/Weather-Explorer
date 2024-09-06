import { render, screen } from '@testing-library/react';
import ForecastCarousel from 'src/components/ForecastCarousel';
import { card } from 'src/constants/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import transformForecastData from 'src/utils/transformForecastData';

it('Should render 15 forecast cards', async () => {
  render(
    <ForecastCarousel
      forecastData={transformForecastData(forecastMock, locationDataMock[0])}
      onCardClick={() => {}}
    />
  );

  const cards = await screen.findAllByTestId(card.testid);

  expect(cards).toHaveLength(15);
});
