import { render, screen } from '@testing-library/react';
import WindDirection from 'src/components/WindDirection';

it.each([
  [36, 'NE'],
  [343, 'N'],
  [284, 'W'],
  [324, 'NW'],
  [357, 'N'],
  [217, 'SW'],
  [88, 'E'],
  [175, 'S'],
])(
  'Should render a cardinal point string depending on the wind direction',
  (deg, cardinalPoint) => {
    render(<WindDirection direction={deg} />);

    screen.getByText(cardinalPoint);
  }
);
