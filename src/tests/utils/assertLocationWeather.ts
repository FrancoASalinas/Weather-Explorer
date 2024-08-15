import { screen, within } from '@testing-library/react';
import { testId } from '../../constants/LocationWeather';
import { WeatherData } from '../../types';

async function assertLocationWeather(weatherData: WeatherData) {
  const location = await screen.findByTestId(testId, {}, { timeout: 6000 });
  const { weather, main, visibility, wind } = weatherData;
  const entries = [
    `${main.temp}ºC`,
    `${main.humidity}%`,
    `${wind.speed}m/s`,
    `${wind.deg}º`,
  ];

  for (const entry of entries) {
    await within(location).findByText(entry, {}, { timeout: 5000 });
  }

  weather.map(
    async data =>
      await within(location).findByText(
        `${data.main} (${data.description})`,
        {},
        { timeout: 5000 }
      )
  );

  if (visibility) {
    await within(location).findByText(
      `${visibility / 1000}km`,
      {},
      { timeout: 5000 }
    );
  }
}

export default assertLocationWeather;
