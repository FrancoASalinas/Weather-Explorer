import { server } from '../mocks/mockServer';
import mockGeolocation from './utils/mockGeolocation';
beforeAll(() => {
  mockGeolocation()
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
