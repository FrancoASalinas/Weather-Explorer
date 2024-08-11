import userLocationMock from '../../mocks/userLocationMock';

function mockGeolocation() {
  const { latitude, longitude } = userLocationMock;
  const geolocation = {
    getCurrentPosition: vi.fn(success =>
      success({ coords: { latitude, longitude } })
    ),
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    value: geolocation,
    configurable: true,
  });
}
export default mockGeolocation;
