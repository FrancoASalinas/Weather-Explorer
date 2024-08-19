import { screen } from '@testing-library/react';
import ForecastCard from 'src/components/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';
import transformForecastData from 'src/utils/transformForecastData';
import componentSetup from '../utils/componentSetup';
import weatherDescriptions from 'src/utils/weatherDescriptions';
import '@testing-library/jest-dom';
import { ForecastCardData } from 'src/types';
import { img } from 'src/constants/ForecastCard';

function setup(index: number) {
  return componentSetup(
    <ForecastCard data={transformForecastData(forecastMock)[index]} />
  );
}

const transformedDataMock = transformForecastData(forecastMock);

function indexRows(table: ForecastCardData[]) {
  return table.map((value, index) => ({ ...value, index: index }));
}

const indexedData = indexRows(transformedDataMock);

it.each(indexedData)(
  'Should render max temperature',
  async ({ index, temperature_max, units }) => {
    setup(index);

    await screen.findByText(`${temperature_max}${units.temperature_2m_max}`);
  }
);

it.each(indexedData)(
  'Should render min temperature',
  async ({ index, temperature_min, units }) => {
    setup(index);

    await screen.findByText(`${temperature_min}${units.temperature_2m_max}`);
  }
);

it.each(indexedData)('Should render date', async ({ index, time }) => {
  setup(index);

  await screen.findByText(time);
});

it.each(indexedData)(
  'Should render an icon with src depending on the weather code',
  async ({ index, weather_code }) => {
    setup(index);

    expect(await screen.findByTestId(img.testid)).toHaveAttribute(
      'src',
      weatherDescriptions[`${weather_code}`].day.image
    );
  }
);

it.each(indexedData)(
  'Should render an icon with alt depending on the weather code',
  async ({ index, weather_code }) => {
    setup(index);

    expect(await screen.findByTestId(img.testid)).toHaveAttribute(
      'alt',
      weatherDescriptions[`${weather_code}`].day.description
    );
  }
);
