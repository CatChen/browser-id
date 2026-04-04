import { v4 as uuid } from 'uuid';
import { Storage } from 'versioned-storage';

const STORAGE_NAME = 'browser_id';
const STORAGE_VERSION = 1;
let storage: Storage<string | undefined> | undefined;

function getStorage(): Storage<string | undefined> {
  if (!storage) {
    storage = new Storage(STORAGE_NAME, STORAGE_VERSION);
  }
  return storage;
}

/**
 * Returns a consistent unique identifier for this browser (or the Node/Deno environment).
 *
 * If no identifier exists yet, one is generated and persisted.
 * @returns {string} The existing or newly generated browser identifier.
 */
export function getBrowserId(): string {
  const existingID = getStorage().read();
  if (existingID != null) {
    return existingID;
  }

  const newID = uuid();
  getStorage().write(newID);
  return newID;
}

/**
 * Backwards-compatible alias for getBrowserId().
 * @returns {string} The existing or newly generated browser identifier.
 */
export function browserId(): string {
  return getBrowserId();
}

/**
 * Check whether a browser ID is already persisted without generating one.
 * @returns {boolean} True if a browser ID is currently persisted.
 */
export function hasBrowserId(): boolean {
  return getStorage().read() != null;
}

/**
 * Delete any persisted browser ID from the underlying storage.
 * @returns {void}
 */
export function deleteBrowserId(): void {
  getStorage().write(undefined);
}

/**
 * Force-generate a new browser ID, persist it, and return it.
 * @returns {string} The newly generated browser identifier.
 */
export function rotateBrowserId(): string {
  const newID = uuid();
  getStorage().write(newID);
  return newID;
}
