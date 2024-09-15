import { ForecastData } from 'src/types';
import { DateTime } from 'luxon';

class HourlyDataView {
  private _forecast: ForecastData;
  public dayList: Day[];
  constructor(forecastData: ForecastData) {
    this._forecast = forecastData;
    this.dayList = this._forecast.daily.time.map(
      time => new Day(time, this._forecast)
    );
  }
}

class Day {
  readonly day: DateTime;
  readonly hours: string[];
  readonly temperature: number[];
  readonly precipitation_probability: number[];
  readonly wind_direction: number[];
  readonly wind_speed: number[];
  readonly weather_code: number[];
  private _forecastHours: string[];

  constructor(time: string, forecast: ForecastData) {
    this.day = DateTime.fromISO(time, { zone: forecast.timezone });
    this._forecastHours = forecast.hourly.time.map(hour =>
      DateTime.fromISO(hour, { zone: forecast.timezone }).toISO()
    ) as string[];
    this.hours = this._forecastHours
      .map(hour => {
        const hourlyDate = DateTime.fromISO(hour, { setZone: true });

        if (
          hourlyDate.hasSame(this.day, 'day') &&
          hourlyDate.hasSame(this.day, 'month')
        ) {
          return hourlyDate.toISO();
        }
      })
      .filter(hour => hour !== undefined) as string[];
    this.temperature = this._mapDataWithHours(forecast.hourly.temperature_2m);
    this.precipitation_probability = this._mapDataWithHours(
      forecast.hourly.precipitation_probability
    );
    this.weather_code = this._mapDataWithHours(forecast.hourly.weather_code);
    this.wind_direction = this._mapDataWithHours(
      forecast.hourly.wind_direction_10m
    );
    this.wind_speed = this._mapDataWithHours(forecast.hourly.wind_speed_10m);
  }

  private _mapDataWithHours(dataArr: number[]) {
    return this.hours.map(hour => {
      return dataArr[this._forecastHours.indexOf(hour)];
    });
  }
}

export default HourlyDataView;
