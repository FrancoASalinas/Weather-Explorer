import {useMemo} from 'react';
import { Forecast } from 'src/utils/transformForecastData';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { DateTime } from 'luxon';

function ForecastChart({ forecastData, isWide }: { forecastData: Forecast, isWide: boolean }) {

  const {
    hours,
    precipitation_probability,
    temperature,
    wind_direction,
    wind_speed,
  } = forecastData.hourly;

  const data = useMemo(
    () =>
      hours.map((hour, index) => ({
        name: DateTime.fromISO(hour, { setZone: true }).hour,
        precipitation: precipitation_probability[index],
        temperature: temperature[index],
        wind_direction: wind_direction[index],
        wind_speed: wind_speed[index],
      })),
    [forecastData.hourly.day]
  );

  return (
    <div className='chart-wrapper'>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Line
            dataKey='precipitation'
            name='Precipitation Probability %'
            yAxisId={2}
            type={'monotone'}
            stroke='#aaf'
            dot={false}
          />
          <Line
            dataKey='temperature'
            name='Temperature ºC'
            yAxisId={1}
            type={'monotone'}
            stroke='#b24333'
            dot={false}
          />
          <Line
            dataKey='wind_direction'
            name='Wind Direction º'
            type={'monotone'}
            stroke='#2aaf04'
            dot={false}
            yAxisId={3}
          />
          <Line
            dataKey='wind_speed'
            name='Wind Speed km/h'
            type={'monotone'}
            stroke='#5435af'
            dot={false}
            yAxisId={0}
          />
          {isWide && (
            <>
              <YAxis
                yAxisId={2}
                width={80}
                label={{ value: 'Precipitation Probability %', angle: -90 }}
                dataKey={'precipitation'}
              />
              <YAxis
                yAxisId={1}
                width={80}
                label={{ value: 'Temperature ºC', angle: -90 }}
                dataKey={'temperature'}
              />
              <YAxis
                yAxisId={3}
                width={80}
                label={{ value: 'Wind Direction º', angle: -90 }}
                dataKey={'wind_direction'}
              />
              <YAxis
                yAxisId={0}
                width={80}
                label={{ value: 'Wind Speed km/h', angle: -90 }}
                dataKey={'wind_speed'}
              />
            </>
          )}
          <Legend />
          <CartesianGrid vertical={false} />
          <XAxis dataKey='name' />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1d2e37',
              border: 'none',
              borderRadius: 10,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ForecastChart;
