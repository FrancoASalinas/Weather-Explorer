import { error } from 'src/constants/WindView';
import cardinalPointsList from 'src/utils/cardinalPoints';
import WindView from 'src/utils/WindView';

function createWindView(deg: number | string, errCb?: (err: string) => void) {
  return new WindView(deg, errCb ? errCb : () => {});
}

it.each(cardinalPointsList)(
  'Should take as parameter a string and return the cardinal direction',
  async (deg, cardinal) => {
    const stringDegrees = deg.toString();
    const wind = createWindView(stringDegrees);

    expect(wind.cardinal).toBe(cardinal);
  }
);

it.each(cardinalPointsList)(
  'Should take as a parameter a number and return the cardinal direction',
  (deg, cardinal) => {
    const wind = createWindView(deg);

    expect(wind.cardinal).toBe(cardinal);
  }
);

it.each([
  ['11', 'N'],
  ['33', 'NE'],
  [52, 'NE'],
  [138, 'SE'],
  [84, 'E'],
  ['279', 'W'],
  ['205', 'SW'],
  [193, 'S'],
  ['75', 'E'],
])('Should return the nearest cardinal direction', (deg, cardinal) => {
  const wind = createWindView(deg);
  expect(wind.cardinal).toBe(cardinal);
});

it.each([-1, -100, '-2000', -34, '-0.5', -10000])(
  `Should take as a parameter an error callback and call it if the first parameter is less than zero with an error message: ${error.negativeDegrees} `,
  deg => {
    const errorCallback = vi.fn((err: string) => {
      err;
    });
    createWindView(deg, errorCallback);

    expect(errorCallback).toBeCalledWith(error.negativeDegrees);
  }
);

it.each([361, '360.2', 1000, '500', 7349, '15932'])(
  `Should call error callback with an error message: ${error.maximumDegrees} ,if the first parameter is greater than 360`,
  deg => {
    const errorCallback = vi.fn();
    createWindView(deg, errorCallback);

    expect(errorCallback).toBeCalledWith(error.maximumDegrees);
  }
);

it.each([
  ['190', 190],
  ['220', 220],
  [45, 45],
])('Should get the direction of the wind', (input, output) => {
  const wind = createWindView(input);

  expect(wind.windDirection).toBe(output);
});
