import { render } from '@testing-library/react';
import ForecastCarousel from '../components/ForecastCarousel';
import forecastMock from '../mocks/forecastMock';

it('Should render 15 forecast cards', async () => {
  render(<ForecastCarousel forecastData={forecastMock} />);
});
