import { StorageType } from './enums/storage-type';
import { StorageAvailableTypes, StorageObjectType } from './interfaces/storage-available-types';
import { callbackToPromise, checkChrome } from './lib/helpers';

/**
 * Saves all the key/value pairs of the object to the local storage. You can use the keys of the object to retrieve the data later. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function saveManyToLocalStorage(data: StorageObjectType) {
    return saveManyToStorage(data, StorageType.Local);
}

/**
 * Saves all the key/value pairs of the object to the sync storage. You can use the keys of the object to retrieve the data later. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function saveManyToSyncStorage(data: StorageObjectType) {
    return saveManyToStorage(data, StorageType.Sync);
}

/**
 * Saves the data in the the local storage using the passed key. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function saveToLocalStorage(key: string, data: StorageAvailableTypes) {
    return saveToStorage(key, data, StorageType.Local);
}

/**
 * Saves the data in the the sync storage using the passed key. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function saveToSyncStorage(key: string, data: StorageAvailableTypes) {
    return saveToStorage(key, data, StorageType.Sync);
}

/**
 * Saves the data in the the storage of your choice using the passed key. You can pass no keys to remove everything. The default storage is the sync storage.
 */
export function saveToStorage(key: string, data: StorageAvailableTypes, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].set, [{ [key]: data }]);
    }
    return runtimeType.storage[type].set({ [key]: data });
}

/**
 * Saves all the key/value pairs of the object to the storage of your choice. The default storage is the sync storage.
 */
export function saveManyToStorage(data: StorageObjectType, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].set, [data]);
    }
    return runtimeType.storage[type].set(data);
}
