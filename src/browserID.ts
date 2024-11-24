import { v4 as uuid } from 'uuid';
import { default as Storage } from 'versioned-storage';

const STORAGE_NAME = 'browser_id';
const STORAGE_VERSION = 1;
const storage: Storage<string> = new Storage(STORAGE_NAME, STORAGE_VERSION);

function browserId(): string {
  const existingID = storage.read();
  if (existingID === null || existingID === undefined) {
    const newID: string = uuid();
    storage.write(newID);
    return newID;
  } else {
    return existingID;
  }
}

export default browserId;
