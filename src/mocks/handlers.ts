import { HttpResponse, delay, http } from 'msw';
import locationDataMock from './locationDataMock';
import weatherDataList from './weatherDataMock';
import userLocationMock from './userLocationMock';
import userWeatherMock from './userWeatherMock';

export const handlers = [
  http.get(
    `https://api.openweathermap.org/geo/1.0/direct`,
    async ({ request }) => {
      const url = new URL(request.url);
      const city = url.searchParams.get('q');

      console.log('city', city)

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

      await delay(500);

      for (let i = 0; i < locationDataMock.length; i++) {
        if (lat === locationDataMock[i].lat) {
          return HttpResponse.json(weatherDataList[i]);
        }

        if (lat === userLocationMock.latitude) {
          return HttpResponse.json(userWeatherMock);
        }
      }

      console.error('Error getting weather for location');
    }
  ),

  http.get('https://ifconfig.co/json', async () => {
    await delay(300);
    return HttpResponse.json(userLocationMock);
  }),
];
