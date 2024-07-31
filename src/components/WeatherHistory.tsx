import { useEffect, useState } from 'react';
import { WeatherHistoryData } from '../types';
import weatherDescriptions from '../utils/weatherDescriptions';
import { useParams } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

export const title = 'Weather History';

function WeatherHistory() {
  const { lat, lon, name } = useParams();
  const [weatherHistory, setWeatherHistory] = useState<WeatherHistoryData>();

  useEffect(() => {
    async function fetchHistory() {
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_direction_10m_dominant&past_days=7&forecast_days=1`
      )
        .then(response => response.json())
        .then(data => setWeatherHistory(data))
        .catch(error => console.error(error));
    }
    fetchHistory();
  }, []);

  function HistoryData() {
    const { daily, daily_units } = weatherHistory as WeatherHistoryData;

    return (
      <>
        {daily.time.map((time, index) => (
          <ul data-testid={time} className='history__day'>
            <li className='history__day__date'>{time}</li>
            <li className='history__day__item'>
              {weatherDescriptions[daily.weather_code[index]].day.description}
            </li>
            <li className='history__day__item'>
              Max temperature: {daily.temperature_2m_max[index]}{' '}
              {daily_units.temperature_2m_max}
            </li>
            <li className='history__day__item'>
              Min temperature: {daily.temperature_2m_min[index]}{' '}
              {daily_units.temperature_2m_max}
            </li>
            <li className='history__day__item'>
              Total rain: {daily.rain_sum[index]} {daily_units.rain_sum}
            </li>
            <li className='history__day__item'>
              Total showers: {daily.showers_sum[index]}{' '}
              {daily_units.showers_sum}
            </li>
            <li className='history__day__item'>
              Total snowfall: {daily.snowfall_sum[index]}{' '}
              {daily_units.snowfall_sum}
            </li>
            <li className='history__day__item'>
              Wind speed: {daily.wind_speed_10m_max[index]}{' '}
              {daily_units.wind_speed_10m_max}
            </li>
            <li className='history__day__item'>
              Wind direction: {daily.wind_direction_10m_dominant[index]}{' '}
              {daily_units.wind_direction_10m_dominant}
            </li>
          </ul>
        ))}
      </>
    );
  }

  return (
    <section className='history' data-testid='history'>
      <h3 className='history__title'>{name} Weather History</h3>
      {weatherHistory ? <HistoryData /> : <LoadingIndicator />}
    </section>
  );
}

export default WeatherHistory;
