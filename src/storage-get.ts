import { StorageType } from './enums/storage-type';
import { StorageChanges, StorageObjectType } from './interfaces/storage-available-types';
import { checkBrowser, tailCallbackToPromise } from './lib/helpers';

/**
 * Retrieves the values of the passed key(s) from the storage of your choice. You can pass no keys to retrieve everything. The default storage is the sync storage.
 */
export async function getFromStorageByKey<T = any>(key: string, defaultValue?: T, type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser): Promise<T | undefined> {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
    if (checkBrowser(runtimeType)) {
        return (await (runtimeType as typeof browser).storage[type].get({ [key]: defaultValue }))[key];
    }
    return (await tailCallbackToPromise(runtimeType.storage[type].get, [{ [key]: defaultValue }]))[key];
}

/**
 * Retrieves the values of the passed key(s) from the storage of your choice. You can pass no keys to retrieve everything. The default storage is the sync storage.
 */
export function getFromStorageByKeys<T = any>(keys?: string[] | { [key: string]: T }, type: StorageType = StorageType.Sync, preferredRuntime?: typeof chrome | typeof browser): Promise<StorageObjectType<T> | undefined> {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
    if (checkBrowser(runtimeType)) {
        return (runtimeType as typeof browser).storage[type].get(keys);
    }
    return tailCallbackToPromise(runtimeType.storage[type].get, [keys]);
}

/**
 * On change listener. Will return any changes from the selected storage.
 */
export function onChange<T = any>(callback: (changes: StorageChanges<T>, type: StorageType) => void, filterType?: StorageType, preferredRuntime?: typeof chrome | typeof browser) {
    const runtimeType = preferredRuntime ?? globalThis.browser ?? globalThis.chrome;
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
