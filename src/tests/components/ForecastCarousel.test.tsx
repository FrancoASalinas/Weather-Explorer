import { render, screen } from '@testing-library/react';
import ForecastCarousel from 'src/components/ForecastCarousel';
import { card } from 'src/constants/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import transformForecastData from 'src/utils/transformForecastData';

it('Should render a forecast card for every day', async () => {
  const transformedData = transformForecastData(forecastMock, locationDataMock[0])
  render(
    <ForecastCarousel
      forecastData={transformedData}
      onCardClick={() => {}}
    />
  );

  const cards = await screen.findAllByTestId(card.testid);

  expect(cards).toHaveLength(transformedData.daily.length);
});
