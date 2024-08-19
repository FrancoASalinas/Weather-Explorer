import forecastMock from 'src/mocks/forecastMock';
import formatDate from 'src/utils/formatDate';
import transformForecastData from 'src/utils/transformForecastData';

const transformedDataMock = transformForecastData(forecastMock);

it('Should transform daily object into an array of data mapped for every date', async () => {
  forecastMock.daily.time.map((time, index) => {
    expect(transformedDataMock).toContainEqual({
      time: formatDate(time),
      weather_code: forecastMock.daily.weather_code[index],
      temperature_max: forecastMock.daily.temperature_2m_max[index],
      temperature_min: forecastMock.daily.temperature_2m_min[index],
      precipitation_sum: forecastMock.daily.precipitation_sum[index],
      wind_speed: forecastMock.daily.wind_speed_10m_max[index],
      wind_direction: forecastMock.daily.wind_direction_10m_dominant[index],
      units: forecastMock.daily_units,
    });
  });
});
