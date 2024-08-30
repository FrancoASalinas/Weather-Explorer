import locationDataMock from 'src/mocks/locationDataMock';

const { lat, lon, name } = locationDataMock[0];
function mockGeolocation() {
  const geolocation = {
    getCurrentPosition: vi.fn(success =>
      success({ coords: { latitude: lat, longitude: lon } })
    ),
  };

  Object.defineProperty(global.navigator, 'geolocation', {
    value: geolocation,
    configurable: true,
  });
}
export default mockGeolocation;
export const locationName = name;
