import { Storage } from 'versioned-storage';
import {
  browserId,
  deleteBrowserId,
  getBrowserId,
  hasBrowserId,
  rotateBrowserId,
} from '../browserID.js';

jest.mock('versioned-storage');
jest.dontMock('uuid');

const MockedStorage = jest.mocked(Storage);
let storedId: string | null = null;

beforeEach(() => {
  storedId = null;
  MockedStorage.prototype.write = jest
    .fn()
    .mockImplementation((id: string | undefined) => {
      storedId = id ?? null;
    });
  MockedStorage.prototype.read = jest.fn().mockImplementation(() => {
    return storedId;
  });
});

it('returns the same device id no matter how many times it is called', () => {
  expect(MockedStorage.mock.instances).toHaveLength(0);

  const firstDeviceId = getBrowserId();
  expect(MockedStorage.mock.instances).toHaveLength(1);
  const storageInstance = MockedStorage.mock.instances[0];

  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(1);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */

  const secondDeviceId = getBrowserId();
  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(2);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */
  expect(secondDeviceId).toBe(firstDeviceId);

  const thirdDeviceId = getBrowserId();
  /* eslint-disable @typescript-eslint/unbound-method */
  expect(storageInstance.read).toHaveBeenCalledTimes(3);
  expect(storageInstance.write).toHaveBeenCalledTimes(1);
  /* eslint-enable @typescript-eslint/unbound-method */
  expect(thirdDeviceId).toBe(firstDeviceId);
});

it('keeps browserId as an alias of getBrowserId', () => {
  const created = getBrowserId();
  expect(browserId()).toBe(created);
});

it('checks ID presence without creating one', () => {
  expect(hasBrowserId()).toBe(false);
  expect(getBrowserId()).toBeDefined();
  expect(hasBrowserId()).toBe(true);
});

it('deletes persisted ID', () => {
  const firstDeviceId = getBrowserId();
  expect(hasBrowserId()).toBe(true);

  deleteBrowserId();
  expect(hasBrowserId()).toBe(false);

  const secondDeviceId = getBrowserId();
  expect(secondDeviceId).not.toBe(firstDeviceId);
});

it('rotates persisted ID', () => {
  const firstDeviceId = getBrowserId();
  const secondDeviceId = rotateBrowserId();

  expect(secondDeviceId).not.toBe(firstDeviceId);
  expect(getBrowserId()).toBe(secondDeviceId);
});
