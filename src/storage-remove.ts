import { StorageType } from './enums/storage-type';
import { callbackToPromise, checkChrome } from './lib/helpers';

export function removeAllLocalStorage() {
    return removeFromStorage(undefined, StorageType.Local);
}

export function removeAllSyncStorage() {
    return removeFromStorage(undefined, StorageType.Sync);
}

export function removeFromLocalStorage(keys: string | string[]) {
    return removeFromStorage(keys, StorageType.Local);
}

export function removeFromSyncStorage(keys: string | string[]) {
    return removeFromStorage(keys, StorageType.Sync);
}

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
