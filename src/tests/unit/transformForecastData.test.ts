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
        description,
        icon,
      },
      main: {
        temp: isToday ? expectedCurrent.main.temp : temperature_max,
      },
      wind: {
        speed: isToday ? expectedCurrent.wind.speed : wind_speed,
        deg: isToday ? expectedCurrent.wind.deg : wind_direction,
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
