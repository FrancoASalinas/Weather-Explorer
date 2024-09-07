import { HttpResponse, delay, http } from 'msw';
import locationDataMock from './locationDataMock';
import forecastMock from './forecastMock';

export const handlers = [
  http.get(
    `https://api.openweathermap.org/geo/1.0/direct`,
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
    'https://api.openweathermap.org/geo/1.0/reverse',
    async ({ request }) => {
      const url = new URL(request.url);
      const lat = url.searchParams.get('lat');
      const lon = url.searchParams.get('lon');

      await delay(400);

      locationDataMock.map(
        location =>
          lat === location.lat.toString() &&
          lon === location.lon.toString() &&
          HttpResponse.json([location])
      );
    }
  ),
  http.get('https://api.open-meteo.com/v1/forecast', async () => {
    await delay(400);
    return HttpResponse.json(forecastMock);
  }),
];
