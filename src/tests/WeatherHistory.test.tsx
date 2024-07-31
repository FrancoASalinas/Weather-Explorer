import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherHistory, { title } from '../components/WeatherHistory';
import weatherDescriptions from '../utils/weatherDescriptions';
import weatherHistoryMock from '../mocks/weatherHistoryMock';

function setup() {
  return {
    user: userEvent.setup(),
    ...render(<WeatherHistory />),
  };
}

it(`Should render ${title}`, async () => {
  setup();
  await screen.findByText(title);
});

it('Should render weather history', async () => {
  setup();

  const { daily, daily_units } = weatherHistoryMock;
  for (let i = 0; i < 7; i++) {
    const historyElement = await screen.findByTestId(
      daily.time[i],
      {},
      { timeout: 1500 }
    );

    async function findElement(text: string) {
      await within(historyElement).findByText(text, {}, { timeout: 7000 });
    }

    await findElement(daily.time[i]);

    await findElement(
      weatherDescriptions[daily.weather_code[i].toString()].day.description
    );

    await findElement(
      `Max temperature: ${daily.temperature_2m_max[i]} ${daily_units.temperature_2m_max}`
    );

    await findElement(
      `Min temperature: ${daily.temperature_2m_min[i]} ${daily_units.temperature_2m_min}`
    );

    await findElement(
      `Total rain: ${daily.rain_sum[i]} ${daily_units.rain_sum}`
    );

    await findElement(
      `Total showers: ${daily.showers_sum[i]} ${daily_units.showers_sum}`
    );

    await findElement(
      `Total snowfall: ${daily.snowfall_sum[i]} ${daily_units.snowfall_sum}`
    );

    await findElement(
      `Wind speed: ${daily.wind_speed_10m_max[i]} ${daily_units.wind_speed_10m_max}`
    );

    await findElement(
      `Wind direction: ${daily.wind_direction_10m_dominant[i]} ${daily_units.wind_direction_10m_dominant}`
    );
  }
}, 20000);
