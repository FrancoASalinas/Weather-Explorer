import { screen, within } from '@testing-library/react';
import { testId } from '../../components/LocationWeather';
import { WeatherData } from '../../types';

async function assertLocationWeather(weatherData: WeatherData) {
  const location = await screen.findByTestId(testId);
  const { weather, main, visibility, wind } = weatherData;
  const entries = [
    `Temperature`,
    `${main.temp}ºC`,
    `Max: ${main.temp_max}ºC`,
    `Min: ${main.temp_min}ºC`,
    `Feels like: ${main.feels_like}ºC`,
    'Humidity',
    `${main.humidity}%`,
    'Wind',
    `Speed: ${wind.speed}m/s`,
    `Direction: ${wind.deg}º`,
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
    (await within(location).findByText('Visibility'), {}, { timeout: 5000 }) &&
      (await within(location).findByText(`${visibility / 1000}km`),
      {},
      { timeout: 5000 });
  }
}

export default assertLocationWeather;
