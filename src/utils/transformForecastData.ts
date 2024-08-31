import { ForecastData, Location, WeatherResult } from 'src/types';
import formatDate from './formatDate';
import weatherDescriptions from './weatherDescriptions';
import getBackgroundImage from './getBackgroundImage';

function transformForecastData(
  data: ForecastData,
  location: Location
): WeatherResult {
  const {
    temperature_2m_max,
    temperature_2m_min,
    weather_code,
    wind_direction_10m_dominant,
    wind_speed_10m_max,
    precipitation_probability_max,
  } = data.daily;

  class Forecast {
    readonly _data: ForecastData;
    readonly _location: Location;

    constructor(data: ForecastData, location: Location) {
      this._data = data;
      this._location = location;
    }

    private _isToday(date: string) {
      const today = new Date().getDate();
      return today === new Date(date).getUTCDate();
    }

    private get _currentPrecipitation() {
      return (
        data.daily.time
          .map((time, index) =>
            this._isToday(time)
              ? data.daily.precipitation_probability_max[index]
              : undefined
          )
          .filter(value => (value ? value : 0))[0] || 0
      );
    }

    public get result() {
      return {
        current: {
          precipitation_probability: this._currentPrecipitation,
          weather: {
            id: data.current.weather_code,
            description:
              weatherDescriptions[data.current.weather_code].day.description,
            icon: weatherDescriptions[data.current.weather_code][
              data.current.is_day === 1 ? 'day' : 'night'
            ].image,
          },
          main: {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
          },
          wind: {
            speed: data.current.wind_speed_10m,
            deg: data.current.wind_direction_10m,
          },
          name: location.name,
          backgroundImage: getBackgroundImage(
            data.current.weather_code,
            data.current.is_day === 1
          ),
        },
        daily: data.daily.time.map((date, index) => ({
          precipitation_probability_max: precipitation_probability_max[index],
          time: formatDate(date),
          weather_code: weather_code[index],
          temperature_max: temperature_2m_max[index],
          temperature_min: temperature_2m_min[index],
          wind_direction: wind_direction_10m_dominant[index],
          wind_speed: wind_speed_10m_max[index],
          units: data.daily_units,
          isToday: this._isToday(date),
        })),
      };
    }
  }

  return new Forecast(data, location).result;
}

export default transformForecastData;
