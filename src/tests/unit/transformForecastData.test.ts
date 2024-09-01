import forecastMock from 'src/mocks/forecastMock';
import locationDataMock from 'src/mocks/locationDataMock';
import formatDate from 'src/utils/formatDate';
import getBackgroundImage from 'src/utils/getBackgroundImage';
import transformForecastData from 'src/utils/transformForecastData';
import weatherDescriptions from 'src/utils/weatherDescriptions';

function getTransformedDataMock() {
  return transformForecastData(forecastMock, locationDataMock[0]);
}

it('Should transform api data to an object mapped for easy access', async () => {
  const transformedData = getTransformedDataMock();
  const expectedDaily = forecastMock.daily.time.map((time, index) => ({
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
  }));
  const expectedCurrent = {
    weather: {
      id: forecastMock.current.weather_code,
      description:
        weatherDescriptions[forecastMock.current.weather_code].day.description,
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
  };

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
    const description = weatherDescriptions[weatherCode].day.description;
    const icon =
      weatherDescriptions[weatherCode][
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
