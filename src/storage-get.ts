import { StorageType } from './enums/storage-type';
import { StorageAvailableTypes, StorageObjectType } from './interfaces/storage-available-types';
import { callbackToPromise, checkChrome } from './lib/helpers';

export function getAllLocalStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Local);
}

export function getAllSyncStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Sync);
}

export function getAllManagedStorage<T = StorageAvailableTypes>() {
    return getFromStorage<T>(undefined, StorageType.Managed);
}

export function getFromLocalStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Local);
}

export function getFromSyncStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Sync);
}

export function getFromManagedStorage<T = StorageAvailableTypes>(keys: string | string[]) {
    return getFromStorage<T>(keys, StorageType.Managed);
}

export function getFromStorage<T = StorageAvailableTypes>(keys?: string | string[], type: StorageType = StorageType.Sync): Promise<StorageObjectType<T>> {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].get, [keys]);
    }
    return runtimeType.storage[type].get(keys);
}
