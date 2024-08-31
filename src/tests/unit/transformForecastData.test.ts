import forecastMock from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import formatDate from 'src/utils/formatDate';
import getBackgroundImage from 'src/utils/getBackgroundImage';
import transformForecastData from 'src/utils/transformForecastData';
import weatherDescriptions from 'src/utils/weatherDescriptions';

it('Should transform daily object into an array of data mapped for every date', async () => {
  const transformedDataMock = transformForecastData(
    forecastMock,
    locationDataMock[0]
  );

  const expectedResult = {
    current: {
      weather: {
        id: forecastMock.current.weather_code,
        description:
          weatherDescriptions[forecastMock.current.weather_code].day
            .description,
        icon: weatherDescriptions[forecastMock.current.weather_code][
          forecastMock.current.is_day ? 'day' : 'night'
        ].image,
      },
      main: {
        temp: forecastMock.current.temperature_2m,
        humidity: forecastMock.current.relative_humidity_2m,
      },
      wind: {
        speed: forecastMock.current.wind_speed_10m,
        deg: forecastMock.current.wind_direction_10m,
      },
      name: locationDataMock[0].name,
      backgroundImage: getBackgroundImage(
        forecastMock.current.weather_code,
        forecastMock.current.is_day === 1
      ),
      precipitation_probability: 20,
    },
    daily: forecastMock.daily.time.map((time, index) => ({
      time: formatDate(time),
      weather_code: forecastMock.daily.weather_code[index],
      temperature_max: forecastMock.daily.temperature_2m_max[index],
      temperature_min: forecastMock.daily.temperature_2m_min[index],
      wind_speed: forecastMock.daily.wind_speed_10m_max[index],
      wind_direction: forecastMock.daily.wind_direction_10m_dominant[index],
      units: forecastMock.daily_units,
      isToday: index === 7,
      precipitation_probability_max:
        forecastMock.daily.precipitation_probability_max[index],
    })),
  };

  expect(transformedDataMock).toEqual(expectedResult);
});
