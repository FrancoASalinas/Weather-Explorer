import { DateTime } from 'luxon';
import forecastMock from 'src/mocks/forecastMock';
import { ForecastData } from 'src/types';
import HourlyDataView from 'src/utils/HourlyDataView';

function setup() {
  const forecastData: ForecastData = {
    ...forecastMock,
    daily: {
      precipitation_probability_max: [21, 32],
      temperature_2m_max: [23, 65],
      temperature_2m_min: [12, 5],
      time: ['2024-08-07', '2024-08-08'],
      weather_code: [1, 3],
      wind_direction_10m_dominant: [112, 340],
      wind_speed_10m_max: [12, 23],
    },
    hourly: {
      time: [
        '2024-08-07T00:00',
        '2024-08-07T01:00',
        '2024-08-07T02:00',
        '2024-08-07T03:00',
        '2024-08-07T04:00',
        '2024-08-07T05:00',
        '2024-08-07T06:00',
        '2024-08-07T07:00',
        '2024-08-07T08:00',
        '2024-08-07T09:00',
        '2024-08-07T10:00',
        '2024-08-07T11:00',
        '2024-08-07T12:00',
        '2024-08-07T13:00',
        '2024-08-07T14:00',
        '2024-08-07T15:00',
        '2024-08-07T16:00',
        '2024-08-07T17:00',
        '2024-08-07T18:00',
        '2024-08-07T19:00',
        '2024-08-07T20:00',
        '2024-08-07T21:00',
        '2024-08-07T22:00',
        '2024-08-07T23:00',
        '2024-08-08T00:00',
      ],
      weather_code: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9, 84,
      ],

      precipitation_probability: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9, 32,
      ],
      temperature_2m: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9, 51,
      ],
      wind_direction_10m: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9, 78,
      ],
      wind_speed_10m: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9, 12,
      ],
    },
  };

  return {
    hourly: new HourlyDataView(forecastData),
  };
}

const expectedHourly = {
  dayList: [
    {
      day: DateTime.fromISO('2024-08-07', { zone: forecastMock.timezone }),
      hours: [
        '2024-08-07T00:00:00.000Z',
        '2024-08-07T01:00:00.000Z',
        '2024-08-07T02:00:00.000Z',
        '2024-08-07T03:00:00.000Z',
        '2024-08-07T04:00:00.000Z',
        '2024-08-07T05:00:00.000Z',
        '2024-08-07T06:00:00.000Z',
        '2024-08-07T07:00:00.000Z',
        '2024-08-07T08:00:00.000Z',
        '2024-08-07T09:00:00.000Z',
        '2024-08-07T10:00:00.000Z',
        '2024-08-07T11:00:00.000Z',
        '2024-08-07T12:00:00.000Z',
        '2024-08-07T13:00:00.000Z',
        '2024-08-07T14:00:00.000Z',
        '2024-08-07T15:00:00.000Z',
        '2024-08-07T16:00:00.000Z',
        '2024-08-07T17:00:00.000Z',
        '2024-08-07T18:00:00.000Z',
        '2024-08-07T19:00:00.000Z',
        '2024-08-07T20:00:00.000Z',
        '2024-08-07T21:00:00.000Z',
        '2024-08-07T22:00:00.000Z',
        '2024-08-07T23:00:00.000Z',
      ],
      temperature: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9,
      ],
      precipitation_probability: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9,
      ],
      weather_code: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9,
      ],
      wind_speed: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9,
      ],
      wind_direction: [
        23, 430, 203, 54, 38, 85, 38, 20, 48, 12, 34, 35, 23, 34, 69, 45, 1, 2,
        90, 5, 43, 4, 6, 9,
      ],
    },
    {
      day: DateTime.fromISO('2024-08-08', { zone: forecastMock.timezone }),
      hours: ['2024-08-08T00:00:00.000Z'],
      temperature: [51],
      precipitation_probability: [32],
      weather_code: [84],
      wind_speed: [12],
      wind_direction: [78],
    },
  ],
};

function assertProp(propToAssert: keyof HourlyDataView['dayList'][0]) {
  const { hourly } = setup();
  for (let i = 0; i < expectedHourly.dayList.length; i++) {
    expect(hourly.dayList[i]).toHaveProperty(propToAssert);
    expect(hourly.dayList[i][propToAssert]).toEqual(
      expectedHourly.dayList[i][propToAssert]
    );
  }
}

it('Should group every different day in an object', () => {
  assertProp('day');
});

it("Should map every hour within it's day object", () => {
  assertProp('hours');
});

it("Should map every temperature data to it's day", () => {
  assertProp('temperature');
});

it("Should map every precipitation probability to it's day", () => {
  assertProp('precipitation_probability');
});

it("Should map every weather_code to it's day", () => {
  assertProp('weather_code');
});
it("Should map every wind_direction to it's day", () => {
  assertProp('wind_direction');
});
it("Should map every wind_speed to it's day", () => {
  assertProp('wind_speed');
});
