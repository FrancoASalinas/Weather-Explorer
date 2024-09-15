import { ForecastCardData, ForecastData, Location } from 'src/types';
import formatDate from './formatDate';
import weatherDescriptions from './weatherDescriptions';
import getBackgroundImage from './getBackgroundImage';
import HourlyDataView from './HourlyDataView';

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

class Daily {
  private _data: ForecastData;
  private _units: ForecastData['daily_units'];
  constructor(data: ForecastData) {
    this._data = data;
    this._units = data.daily_units;
  }

  get data() {
    return this._formatData(this._data);
  }

  private _isToday(date: string) {
    const today = new Date();
    const newDate = new Date(date);

    return (
      today.getDate() === newDate.getUTCDate() &&
      today.getMonth() === newDate.getUTCMonth()
    );
  }

  private _formatData(data: ForecastData) {
    return data.daily.time.map((date, index) => {
      const {
        temperature_2m_max,
        temperature_2m_min,
        weather_code,
        wind_direction_10m_dominant,
        wind_speed_10m_max,
        precipitation_probability_max,
      } = this._data.daily;
      return {
        precipitation_probability_max: `${precipitation_probability_max[index]}${this._units.precipitation_probability_max}`,
        time: formatDate(date),
        weather_code: weather_code[index],
        temperature_max: `${temperature_2m_max[index]}${this._units.temperature_2m_max}`,
        temperature_min: `${temperature_2m_min[index]}${this._units.temperature_2m_min}`,
        wind_direction: `${wind_direction_10m_dominant[index]}${this._units.wind_direction_10m_dominant}`,
        wind_speed: `${wind_speed_10m_max[index]} ${this._units.wind_speed_10m_max}`,
        isToday: this._isToday(date),
      };
    });
  }
}

class Forecast {
  private _data: ForecastData;
  private _location: Location;
  private _current: CurrentForecast;
  private _daily: ForecastCardData[];
  private _hourly: HourlyDataView;
  public daily;

  constructor(data: ForecastData, location: Location) {
    this._data = data;
    this._location = location;
    this._daily = new Daily(data).data;
    this._current = new CurrentForecast(
      this._daily.find(({ isToday }) => isToday === true) || this._daily[7]
    );
    this._hourly = new HourlyDataView(data);
    this.daily = this._daily;
  }

  public get hourly() {
    const day = this._hourly.dayList.find(
      ({ day }) => formatDate(day.toString()) === this._current._data.time
    ) as HourlyDataView['dayList'][0];
    return day;
  }

  public get current() {
    return this._currentWeather;
  }

  public setCurrent(newCurrent: ForecastCardData) {
    this._current = new CurrentForecast(newCurrent);
  }

  private get _currentPrecipitation() {
    return this._current.data.precipitation_probability_max;
  }

  private get _isToday() {
    return this._current.data.isToday;
  }

  private get _description() {
    return weatherDescriptions[
      this._isToday
        ? this._data.current.weather_code
        : this._current.data.weather_code
    ].day.description;
  }

  private get _icon() {
    return weatherDescriptions[
      this._isToday
        ? this._data.current.weather_code
        : this._current.data.weather_code
    ][
      this._isToday
        ? this._data.current.is_day === 1
          ? 'day'
          : 'night'
        : 'day'
    ].image;
  }

  private get _temp() {
    return this._isToday
      ? `${this._data.current.temperature_2m}${this._data.daily_units.temperature_2m_max}`
      : this._current.data.temperature_max;
  }

  private get _windSpeed() {
    return this._isToday
      ? `${this._data.current.wind_speed_10m} ${this._data.daily_units.wind_speed_10m_max}`
      : this._current.data.wind_speed;
  }

  private get _windDeg() {
    return this._isToday
      ? `${this._data.current.wind_direction_10m}${this._data.daily_units.wind_direction_10m_dominant}`
      : this._current.data.wind_direction;
  }

  private get _backgroundImage() {
    return getBackgroundImage(
      this._isToday
        ? this._data.current.weather_code
        : this._current.data.weather_code,
      this._isToday ? this._data.current.is_day === 1 : true
    );
  }

  private get _currentWeather() {
    return {
      precipitation_probability: this._currentPrecipitation,
      weather: {
        description: this._description,
        icon: this._icon,
      },
      main: {
        temp: this._temp,
      },
      wind: {
        speed: this._windSpeed,
        deg: this._windDeg,
      },
      name: this._location.name,
      backgroundImage: this._backgroundImage,
    };
  }
}

export default transformForecastData;
export { Forecast };
