import { StorageType } from './enums/storage-type';
import { callbackToPromise, checkBrowser } from './lib/helpers';

/**
 * Removes everything from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function removeAllFromStorage(type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return runtimeType.storage[type].clear();
    }
    return callbackToPromise(runtimeType.storage[type].clear, []);
}

/**
 * Removes the values of the passed key(s) from the storage of your choice. You can pass no keys to remove everything. The default storage is the sync storage.
 */
export function removeFromStorage(keys: string | string[], type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return runtimeType.storage[type].remove(keys);
    }
    return callbackToPromise(runtimeType.storage[type].remove, [keys]);
}
