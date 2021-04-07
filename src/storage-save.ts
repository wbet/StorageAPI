import { StorageType } from './enums/storage-type';
import { StorageAvailableTypes, StorageObjectType } from './interfaces/storage-available-types';
import { callbackToPromise, checkBrowser } from './lib/helpers';

/**
 * Saves the data in the the storage of your choice using the passed key. The default storage is the sync storage.
 */
export function saveToStorage(key: string, data: StorageAvailableTypes, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return runtimeType.storage[type].set({ [key]: data });
    }
    return callbackToPromise(runtimeType.storage[type].set, [{ [key]: data }]);
}

/**
 * Saves all the key/value pairs of the object to the storage of your choice. The default storage is the sync storage.
 */
export function saveManyToStorage(data: StorageObjectType | object, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return runtimeType.storage[type].set(data);
    }
    return callbackToPromise(runtimeType.storage[type].set, [data]);
}
