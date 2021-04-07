import { StorageType } from './enums/storage-type';
import { StorageAvailableTypes, StorageChanges, StorageObjectType } from './interfaces/storage-available-types';
import { callbackToPromise, checkBrowser } from './lib/helpers';

/**
 * Retrieves the values of the passed key(s) from the storage of your choice. You can pass no keys to retrieve everything. The default storage is the sync storage.
 */
export async function getFromStorageByKey<T = StorageAvailableTypes>(key: string, defaultValue?: T, type: StorageType = StorageType.Sync): Promise<T | undefined> {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return (await runtimeType.storage[type].get({ key: defaultValue }))[key];
    }
    return (await callbackToPromise(runtimeType.storage[type].get, [{ key: defaultValue }]))[key];
}

/**
 * Retrieves the values of the passed key(s) from the storage of your choice. You can pass no keys to retrieve everything. The default storage is the sync storage.
 */
export function getFromStorageByKeys<T = StorageAvailableTypes | object>(keys?: string[] | { [key: string]: T }, type: StorageType = StorageType.Sync): Promise<StorageObjectType<T> | undefined> {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkBrowser()) {
        return runtimeType.storage[type].get(keys);
    }
    return callbackToPromise(runtimeType.storage[type].get, [keys]);
}

export function onChange<T = StorageAvailableTypes | object>(callback: (changes: StorageChanges<T>, type: StorageType) => void, filterType?: StorageType) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    const filteredCallback = (changes: StorageChanges<T>, type: string) => {
        if (filterType) {
            if (filterType === type) {
                callback(changes, type);
            }
        } else {
            callback(changes, type as StorageType);
        }
    };
    return runtimeType.storage.onChanged.addListener(filteredCallback);
}
