import { StorageType } from './enums/storage-type';
import { StorageObjectType } from './interfaces/storage-available-types';
import { checkBrowser, tailCallbackToPromise } from './lib/helpers';

/**
 * Saves the data in the the storage of your choice using the passed key. The default storage is the sync storage.
 */
export function saveToStorage(key: string, data: any, type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser) {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
    if (checkBrowser(runtimeType)) {
        return runtimeType.storage[type].set({ [key]: data });
    }
    return tailCallbackToPromise(runtimeType.storage[type].set, [{ [key]: data }]);
}

/**
 * Saves all the key/value pairs of the object to the storage of your choice. The default storage is the sync storage.
 */
export function saveManyToStorage(data: StorageObjectType, type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser) {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
    if (checkBrowser(runtimeType)) {
        return runtimeType.storage[type].set(data);
    }
    return tailCallbackToPromise(runtimeType.storage[type].set, [data]);
}
