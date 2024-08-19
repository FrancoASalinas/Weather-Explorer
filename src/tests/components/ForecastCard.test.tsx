import { screen } from '@testing-library/react';
import ForecastCard from 'src/components/ForecastCard';
import forecastMock from 'src/mocks/forecastMock';
import transformForecastData from 'src/utils/transformForecastData';
import componentSetup from '../utils/componentSetup';
import weatherDescriptions from 'src/utils/weatherDescriptions';
import '@testing-library/jest-dom';

function setup() {
  componentSetup(
    <ForecastCard data={transformForecastData(forecastMock).daily[index]} />
  );
}

const transformedDataMock = transformForecastData(forecastMock);

const index = Math.floor(Math.random() * 15);

it('Should render max temperature', async () => {
  setup();

  await screen.findByText(
    `${transformedDataMock.daily[index].temperature_max}${forecastMock.daily_units.temperature_2m_max}`
  );
});

it('Should render min temperature', async () => {
  setup();

  await screen.findByText(
    `${transformedDataMock.daily[index].temperature_min}${forecastMock.daily_units.temperature_2m_max}`
  );
});

it('Should render date', async () => {
  setup();

  await screen.findByText(transformedDataMock.daily[index].time);
});

it('Should render an icon with src depending on the weather code', async () => {
  setup();

  expect(await screen.findByTestId('forecast-icon')).toHaveAttribute(
    'src',
    weatherDescriptions[`${transformedDataMock.daily[index].weather_code}`].day
      .image
  );
});

it('Should render an icon with alt depending on the weather code', async () => {
  setup();

  expect(await screen.findByTestId('forecast-icon')).toHaveAttribute(
    'alt',
    weatherDescriptions[`${transformedDataMock.daily[index].weather_code}`].day
      .description
  );
});
