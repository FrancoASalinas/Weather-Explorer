import { server } from '../mocks/mockServer';
import mockGeolocation from './utils/mockGeolocation';
beforeAll(() => {
  mockGeolocation()
  server.listen();
  window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
    }));
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
