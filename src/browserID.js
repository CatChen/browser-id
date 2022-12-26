// @flow strict

const uuid = require('uuid').v4;
const Storage = require('versioned-storage');

const STORAGE_NAME = 'browser_id';
const STORAGE_VERSION = 1;
const storage: Storage<string> = new Storage(STORAGE_NAME, STORAGE_VERSION);

const browserId = function (): string {
  const existingID = storage.read();
  if (existingID === null || existingID === undefined) {
    const newID: string = uuid();
    storage.write(newID);
    return newID;
  } else {
    return existingID;
  }
};

module.exports = browserId;
