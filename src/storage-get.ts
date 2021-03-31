import { StorageType } from './enums/storage-type';
import { StorageAvailableTypes, StorageObjectType } from './interfaces/storage-available-types';
import { callbackToPromise, checkChrome } from './lib/helpers';

/**
 * Retrieves everything from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function getAllLocalStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Local);
}

/**
 * Retrieves everything from the sync storage. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function getAllSyncStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Sync);
}

/**
 * Retrieves everything from the managed storage. Managed storage is a read only storage controlled by your organization.
 */
export function getAllManagedStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Managed);
}

/**
 * Retrieves the values of the passed key(s) from the local storage. Local storage is the extensions storage in the browser, it will not be synced.
 */
export function getFromLocalStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Local);
}

/**
 * Retrieves the values of the passed key(s) from the sync storage. Sync storage automatically syncs the data across all devices connected to the users account.
 */
export function getFromSyncStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Sync);
}

/**
 * Retrieves the values of the passed key(s) from the managed storage. Managed storage is a read only storage controlled by your organization.
 */
export function getFromManagedStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Managed);
}

/**
 * Retrieves the values of the passed key(s) from the storage of your choice. You can pass no keys to retrieve everything. The default storage is the sync storage.
 */
export function getFromStorage<T = StorageAvailableTypes>(keys?: string | string[], type: StorageType = StorageType.Sync): Promise<StorageObjectType<T>> {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].get, [keys]);
    }
    return runtimeType.storage[type].get(keys);
}
