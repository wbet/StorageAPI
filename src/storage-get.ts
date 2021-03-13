import { StorageType } from './enums/storage-type';
import { callbackToPromise, checkChrome } from './lib/helpers';

export function getAllLocalStorage() {
    return getFromStorage(undefined, StorageType.Local);
}

export function getAllSyncStorage() {
    return getFromStorage(undefined, StorageType.Sync);
}

export function getAllManagedStorage() {
    return getFromStorage(undefined, StorageType.Managed);
}

export function getFromLocalStorage(keys: string | string[]) {
    return getFromStorage(keys, StorageType.Local);
}

export function getFromSyncStorage(keys: string | string[]) {
    return getFromStorage(keys, StorageType.Sync);
}

export function getFromManagedStorage(keys: string | string[]) {
    return getFromStorage(keys, StorageType.Managed);
}

export function getFromStorage(keys?: string | string[], type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].get, [keys]);
    }
    return runtimeType.storage[type].get(keys);
}
