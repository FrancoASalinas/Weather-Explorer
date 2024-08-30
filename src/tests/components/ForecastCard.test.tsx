import { screen } from '@testing-library/react';
import ForecastCard from 'src/components/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';
import transformForecastData from 'src/utils/transformForecastData';
import componentSetup from '../utils/componentSetup';
import weatherDescriptions from 'src/utils/weatherDescriptions';
import '@testing-library/jest-dom';
import { img } from 'src/constants/ForecastCard';
import locationDataMock from 'src/mocks/locationDataMock';
import indexRows from '../utils/indexRows';

const transformedDataMock = transformForecastData(
  forecastMock,
  locationDataMock[0]
).daily;

function setup(index: number) {
  return componentSetup(<ForecastCard data={transformedDataMock[index]} />);
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
