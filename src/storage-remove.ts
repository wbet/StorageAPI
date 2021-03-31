import { StorageType } from './enums/storage-type';
import { callbackToPromise, checkChrome } from './lib/helpers';

/**
 * Removes everything from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function removeAllLocalStorage() {
    return removeFromStorage(undefined, StorageType.Local);
}

/**
 * Removes everything from the sync storage. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function removeAllSyncStorage() {
    return removeFromStorage(undefined, StorageType.Sync);
}

/**
 * Removes the values of the passed key(s) from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function removeFromLocalStorage(keys: string | string[]) {
    return removeFromStorage(keys, StorageType.Local);
}

/**
 * Removes the values of the passed key(s) from the sync storage. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function removeFromSyncStorage(keys: string | string[]) {
    return removeFromStorage(keys, StorageType.Sync);
}

/**
 * Removes the values of the passed key(s) from the storage of your choice. You can pass no keys to remove everything. The default storage is the sync storage.
 */
export function removeFromStorage(keys?: string | string[], type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (keys) {
        if (checkChrome()) {
            return callbackToPromise(runtimeType.storage[type].remove, [keys]);
        }
        return runtimeType.storage[type].remove(keys);
    } else {
        if (checkChrome()) {
            return callbackToPromise(runtimeType.storage[type].clear, []);
        }
        return runtimeType.storage[type].clear();
    }
}
