import { default as browserId } from '../browserID';
import { default as Storage } from 'versioned-storage';

jest.mock('versioned-storage');
jest.dontMock('uuid');

const MockedStorage = Storage as jest.MockedClass<typeof Storage<string>>;

beforeEach(() => {
  let storedId: string | null = null;
  MockedStorage.mock.instances[0].write = jest
    .fn()
    .mockImplementation((id: string) => {
      storedId = id;
    });
  MockedStorage.mock.instances[0].read = jest.fn().mockImplementation(() => {
    return storedId;
  });
});

it('returns the same device id no matter how many times it is called', () => {
  expect(MockedStorage.mock.instances).toHaveLength(1);
  const storageInstance = MockedStorage.mock.instances[0];

  const firstDeviceId = browserId();
  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(1);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */

  const secondDeviceId = browserId();
  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(2);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */
  expect(secondDeviceId).toBe(firstDeviceId);

  const thirdDeviceId = browserId();
  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(3);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */
  expect(thirdDeviceId).toBe(firstDeviceId);
});
