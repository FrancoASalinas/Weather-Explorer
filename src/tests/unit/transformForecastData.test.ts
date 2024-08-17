import forecastMock from 'src/mocks/forecastMock';
import transformForecastData from 'src/utils/transformForecastData';

const transformedDataMock = transformForecastData(forecastMock);

it('Should keep current_units object', async () => {
  expect(transformedDataMock).toHaveProperty(
    'current_units',
    forecastMock.current_units
  );
});

it('Should keep daily_units object', async () => {
  expect(transformedDataMock).toHaveProperty(
    'daily_units',
    forecastMock.daily_units
  );
});

it('Should keep current object', async () => {
  expect(transformedDataMock).toHaveProperty('current', forecastMock.current);
});

it('Should transform daily object into an array of data mapped for every date', async () => {
  forecastMock.daily.time.map((date, index) => {
    expect(transformedDataMock.daily).toContainEqual({
      time: date,
      weather_code: forecastMock.daily.weather_code[index],
      temperature_max: forecastMock.daily.temperature_2m_max[index],
      temperature_min: forecastMock.daily.temperature_2m_min[index],
      precipitation_sum: forecastMock.daily.precipitation_sum[index],
      wind_speed: forecastMock.daily.wind_speed_10m_max[index],
      wind_direction: forecastMock.daily.wind_direction_10m_dominant[index],
    });
  });
});
