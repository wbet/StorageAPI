import { StorageType } from './enums/storage-type';
import { ObjectType, StorageAvailableTypes } from './interfaces/storage-available-types';
import { callbackToPromise, checkChrome } from './lib/helpers';

export function saveToLocalStorage(key: string, data: StorageAvailableTypes) {
    return saveToStorage(key, data, StorageType.Local);
}

export function saveToSyncStorage(key: string, data: StorageAvailableTypes) {
    return saveToStorage(key, data, StorageType.Sync);
}

export function saveManyToLocalStorage(data: ObjectType) {
    return saveManyToStorage(data, StorageType.Local);
}

export function saveManyToSyncStorage(data: ObjectType) {
    return saveManyToStorage(data, StorageType.Sync);
}

export function saveToStorage(key: string, data: StorageAvailableTypes, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].set, [{ [key]: data }]);
    }
    return runtimeType.storage[type].set({ [key]: data });
}

export function saveManyToStorage(data: ObjectType, type: StorageType = StorageType.Sync) {
    const runtimeType = globalThis.browser ?? globalThis.chrome;
    if (checkChrome()) {
        return callbackToPromise(runtimeType.storage[type].set, [data]);
    }
    return runtimeType.storage[type].set(data);
}
