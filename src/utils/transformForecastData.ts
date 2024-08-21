import { ForecastData } from 'src/types';
import formatDate from './formatDate';

function transformForecastData(data: ForecastData) {
  const {
    precipitation_sum,
    temperature_2m_max,
    temperature_2m_min,
    weather_code,
    wind_direction_10m_dominant,
    wind_speed_10m_max,
  } = data.daily;



  return data.daily.time.map((date, index) => ({
    time: formatDate(date),
    weather_code: weather_code[index],
    precipitation_sum: precipitation_sum[index],
    temperature_max: temperature_2m_max[index],
    temperature_min: temperature_2m_min[index],
    wind_direction: wind_direction_10m_dominant[index],
    wind_speed: wind_speed_10m_max[index],
    units: data.daily_units,
  }));
}

export default transformForecastData;
