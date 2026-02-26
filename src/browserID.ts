import { v4 as uuid } from 'uuid';
import { Storage } from 'versioned-storage';

const STORAGE_NAME = 'browser_id';
const STORAGE_VERSION = 1;
const storage: Storage<string | undefined> = new Storage(
  STORAGE_NAME,
  STORAGE_VERSION,
);

function readBrowserId(): string | null {
  const existingID = storage.read();
  return existingID ?? null;
}

/**
 * Returns a consistent unique identifier for this browser (or the Node/Deno environment).
 *
 * If no identifier exists yet, one is generated and persisted.
 * @returns {string} The existing or newly generated browser identifier.
 */
export function getBrowserId(): string {
  const existingID = readBrowserId();
  if (existingID !== null) {
    return existingID;
  }

  const newID = uuid();
  storage.write(newID);
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
  return readBrowserId() !== null;
}

/**
 * Delete any persisted browser ID from localStorage.
 * @returns {void}
 */
export function deleteBrowserId(): void {
  Storage.reset();
}

/**
 * Force-generate a new browser ID, persist it, and return it.
 * @returns {string} The newly generated browser identifier.
 */
export function rotateBrowserId(): string {
  const newID = uuid();
  storage.write(newID);
  return newID;
}
