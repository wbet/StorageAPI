import { StorageType } from './enums/storage-type';
import { checkBrowser, tailCallbackToPromise } from './lib/helpers';

/**
 * Removes everything from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function removeAllFromStorage(type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser) {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;

    if (checkBrowser(runtimeType)) {
        return runtimeType.storage[type].clear();
    }
    return tailCallbackToPromise(runtimeType.storage[type].clear, []);
}

/**
 * Removes the values of the passed key(s) from the storage of your choice. You can pass no keys to remove everything. The default storage is the sync storage.
 */
export function removeFromStorage(keys: string | string[], type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser) {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
    if (checkBrowser(runtimeType)) {
        return runtimeType.storage[type].remove(keys);
    }
    return tailCallbackToPromise(runtimeType.storage[type].remove, [keys]);
}
