import { StorageType } from './enums/storage-type';
import { BasicTypes, StorageAvailableTypes, StorageChanges, StorageObjectType } from './interfaces/storage-available-types';
import { getFromStorageByKey, getFromStorageByKeys, onChange } from './storage-get';
import { removeAllFromStorage, removeFromStorage } from './storage-remove';
import { saveManyToStorage, saveToStorage } from './storage-save';

export {
    getFromStorageByKey,
    onChange,
    getFromStorageByKeys,
    removeAllFromStorage,
    removeFromStorage,
    saveToStorage,
    saveManyToStorage,
    BasicTypes,
    StorageAvailableTypes,
    StorageObjectType,
    StorageType,
    StorageChanges
};
