import { Location } from 'src/types';

const locationDataMock: Location[] = [
  {
    name: 'London',
    local_names: {
      ms: 'London',
      gu: 'લંડન',
      is: 'London',
      wa: 'Londe',
    },
    lat: 51.5073219,
    lon: -0.1276474,
    country: 'GB',
    state: 'England',
  },
  {
    name: 'City of London',
    local_names: {
      es: 'City de Londres',
    },
    lat: 51.5156177,
    lon: -0.0919983,
    country: 'GB',
    state: 'England',
  },
  {
    name: 'London2',
    local_names: {
      el: 'Λόντον',
    },
    lat: 42.9832406,
    lon: -81.243372,
    country: 'CA',
    state: 'Ontario',
  },
];

export default locationDataMock;
