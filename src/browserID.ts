import { v4 as uuid } from 'uuid';
import { Storage } from 'versioned-storage';

const STORAGE_NAME = 'browser_id';
const STORAGE_VERSION = 1;
const storage: Storage<string> = new Storage(STORAGE_NAME, STORAGE_VERSION);

/**
 * A function that returns a consistent unique identifier for the browser (or the Node/Deno environment).
 * The same browser will always return the same identifier.
 * @returns {string} The unique identifier.
 */
export function browserId(): string {
  const existingID = storage.read();
  if (existingID === null || existingID === undefined) {
    const newID: string = uuid();
    storage.write(newID);
    return newID;
  } else {
    return existingID;
  }
}
