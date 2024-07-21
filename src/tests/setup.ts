import { server } from '../mocks/mockServer';

beforeAll(() => {
  console.log('before');
  server.listen();
});

afterEach(() => {
  console.log('each');
  server.resetHandlers();
});

afterAll(() => {
  console.log('after');
  server.close();
});
