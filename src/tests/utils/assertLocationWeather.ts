import { screen, within } from '@testing-library/react';
import { testId } from '../../constants/LocationWeather';
import { Forecast } from 'src/utils/transformForecastData';

async function assertLocationWeather(weatherData: Forecast['current']) {
  const location = await screen.findByTestId(testId, {}, { timeout: 6000 });
  const { weather, main, precipitation_probability, wind } = weatherData;
  const entries = [
    main.temp,
    wind.speed,
    wind.deg,
  ];

  for (const entry of entries) {
    await within(location).findByText(entry, {}, { timeout: 5000 });
  }

  await within(location).findByText(
    weather.description,
    {},
    { timeout: 5000 }
  );

  await within(location).findByText(
    precipitation_probability,
    {},
    { timeout: 5000 }
  );
}

export default assertLocationWeather;
