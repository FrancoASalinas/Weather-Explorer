import forecastMock, {
  expectedCurrent,
  expectedDaily,
} from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import getBackgroundImage from 'src/utils/getBackgroundImage';
import transformForecastData from 'src/utils/transformForecastData';
import weatherDescriptions from 'src/utils/weatherDescriptions';

function getTransformedDataMock() {
  return transformForecastData(forecastMock, locationDataMock[0]);
}

it('Should transform api data to an object mapped for easy access', async () => {
  const transformedData = getTransformedDataMock();

  expect(transformedData.current).toEqual(expectedCurrent);
  expect(transformedData.daily).toEqual(expectedDaily);
});

it('Should change current data when setting current field', async () => {
  const transformedData = getTransformedDataMock();

  for (let i = 0; i < transformedData.daily.length; i++) {
    transformedData.setCurrent(transformedData.daily[i]);
    const {
      isToday,
      precipitation_probability_max,
      temperature_max,
      weather_code,
      wind_direction,
      wind_speed,
    } = transformedData.daily[i];

    const weatherCode = isToday
      ? forecastMock.current.weather_code
      : weather_code;
    const descriptionRecord = weatherDescriptions[weatherCode];
    const description = descriptionRecord.day.description;
    const icon =
      descriptionRecord[
        isToday ? (forecastMock.current.is_day ? 'day' : 'night') : 'day'
      ].image;

    expect(transformedData.current).toEqual({
      weather: {
        id: weatherCode,
        description,
        icon,
      },
      main: {
        temp: isToday ? forecastMock.current.temperature_2m : temperature_max,
        humidity: isToday
          ? forecastMock.current.relative_humidity_2m
          : undefined,
      },
      wind: {
        speed: isToday ? forecastMock.current.wind_speed_10m : wind_speed,
        deg: isToday ? forecastMock.current.wind_direction_10m : wind_direction,
      },
      name: locationDataMock[0].name,
      backgroundImage: getBackgroundImage(
        weatherCode,
        isToday ? forecastMock.current.is_day === 1 : true
      ),
      precipitation_probability: precipitation_probability_max,
    });
  }
});
