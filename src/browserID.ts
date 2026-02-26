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
 */
export function browserId(): string {
  return getBrowserId();
}

/**
 * Check whether a browser ID is already persisted without generating one.
 */
export function hasBrowserId(): boolean {
  return readBrowserId() !== null;
}

/**
 * Delete any persisted browser ID.
 */
export function deleteBrowserId(): void {
  storage.write(undefined);
}

/**
 * Force-generate a new browser ID, persist it, and return it.
 */
export function rotateBrowserId(): string {
  const newID = uuid();
  storage.write(newID);
  return newID;
}
