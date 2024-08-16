import { render } from '@testing-library/react';
import ForecastCarousel from 'src/components/ForecastCarousel';
import forecastMock from 'src/mocks/forecastMock';

it('Should render 15 forecast cards', async () => {
  render(<ForecastCarousel forecastData={forecastMock} />);
});
