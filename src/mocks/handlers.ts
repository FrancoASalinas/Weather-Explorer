import { HttpResponse, delay, http } from 'msw';
import locationDataMock from './locationDataMock';
import weatherDataList from './weatherDataMock';

export const handlers = [
  http.get(
    `http://api.openweathermap.org/geo/1.0/direct`,
    async ({ request }) => {
      const url = new URL(request.url);
      const city = url.searchParams.get('q');

      await delay(1000);

      if (city === 'london') {
        return HttpResponse.json(locationDataMock);
      } else if (city === '!!!') {
        return new HttpResponse('Unexpected error', { status: 500 });
      } else {
        return HttpResponse.json([]);
      }
    }
  ),
  http.get(
    'https://api.openweathermap.org/data/2.5/weather',
    async ({ request }) => {
      const url = new URL(request.url);
      const lat = Number(url.searchParams.get('lat'));

      for (let i = 0; i < locationDataMock.length; i++) {
        if (lat === locationDataMock[i].lat) {
          return HttpResponse.json(weatherDataList[i]);
        }
      }

      console.error('Error getting weather for location');
    }
  ),
];
