import { fireEvent, render, screen } from '@testing-library/react';
import Weather from 'src/components/Weather';
import forecastMock from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import transformForecastData from 'src/utils/transformForecastData';

it('Should call callback function when finishing loading image', () => {
  const callback = vi.fn();
  render(
    <Weather
      weatherData={
        transformForecastData(forecastMock, locationDataMock[0]).current
      }
      onImageLoad={callback}
    />
  );

  fireEvent.load(screen.getByTestId('weather-background-image'));

  expect(callback).toBeCalled();
});
