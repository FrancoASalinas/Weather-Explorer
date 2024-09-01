import { ForecastCardData, ForecastData, Location } from 'src/types';
import formatDate from './formatDate';
import weatherDescriptions from './weatherDescriptions';
import getBackgroundImage from './getBackgroundImage';

function transformForecastData(data: ForecastData, location: Location) {
  return new Forecast(data, location);
}
class CurrentForecast {
  readonly _data: ForecastCardData;
  constructor(data: ForecastCardData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }
}

class Forecast {
  readonly _data: ForecastData;
  readonly _location: Location;
  private _current: CurrentForecast;
  readonly _daily: ForecastCardData[];
  public current;
  public daily;

  constructor(
    data: ForecastData,
    location: Location,
    current?: ForecastCardData
  ) {
    this._data = data;
    this._location = location;
    this._daily = data.daily.time.map((date, index) => {
      const {
        temperature_2m_max,
        temperature_2m_min,
        weather_code,
        wind_direction_10m_dominant,
        wind_speed_10m_max,
        precipitation_probability_max,
      } = this._data.daily;
      return {
        precipitation_probability_max: precipitation_probability_max[index],
        time: formatDate(date),
        weather_code: weather_code[index],
        temperature_max: temperature_2m_max[index],
        temperature_min: temperature_2m_min[index],
        wind_direction: wind_direction_10m_dominant[index],
        wind_speed: wind_speed_10m_max[index],
        units: data.daily_units,
        isToday: this._isToday(date),
      };
    });
    this._current = new CurrentForecast(
      current ||
        this._daily.find(({ isToday }) => isToday === true) ||
        this._daily[7]
    );
    (this.current = this._currentWeather), (this.daily = this._daily);
  }

  public setCurrent(newCurrent: ForecastCardData) {
    this._current = new CurrentForecast(newCurrent);
    this.current = this._currentWeather;
  }

  private _isToday(date: string) {
    const today = new Date().getDate();
    return today === new Date(date).getUTCDate();
  }

  private get _currentPrecipitation() {
    return this._current.data.precipitation_probability_max;
  }

  private get _currentWeather() {
    const isToday = this._current.data.isToday;
    return {
      precipitation_probability: this._currentPrecipitation,
      weather: {
        id: isToday
          ? this._data.current.weather_code
          : this._current.data.weather_code,
        description:
          weatherDescriptions[
            isToday
              ? this._data.current.weather_code
              : this._current.data.weather_code
          ].day.description,
        icon: weatherDescriptions[
          isToday
            ? this._data.current.weather_code
            : this._current.data.weather_code
        ][isToday ? (this._data.current.is_day === 1 ? 'day' : 'night') : 'day']
          .image,
      },
      main: {
        temp: isToday
          ? this._data.current.temperature_2m
          : this._current.data.temperature_max,
        humidity: isToday ? this._data.current.relative_humidity_2m : undefined,
      },
      wind: {
        speed: isToday
          ? this._data.current.wind_speed_10m
          : this._current.data.wind_speed,
        deg: isToday
          ? this._data.current.wind_direction_10m
          : this._current.data.wind_direction,
      },
      name: this._location.name,
      backgroundImage: getBackgroundImage(
        isToday
          ? this._data.current.weather_code
          : this._current.data.weather_code,
        isToday ? this._data.current.is_day === 1 : true
      ),
    };
  }
}

export default transformForecastData;
export { Forecast };
