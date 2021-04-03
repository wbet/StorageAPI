import { StorageType } from './enums/storage-type';
import { BasicTypes, StorageAvailableTypes, StorageObjectType } from './interfaces/storage-available-types';
import {
    getAllLocalStorage,
    getAllManagedStorage,
    getAllSyncStorage,
    getFromLocalStorage,
    getFromManagedStorage,
    getFromStorage,
    getFromSyncStorage
} from './storage-get';
import {
    removeAllLocalStorage,
    removeAllSyncStorage,
    removeFromLocalStorage,
    removeFromStorage,
    removeFromSyncStorage
} from './storage-remove';
import {
    saveManyToLocalStorage,
    saveManyToStorage,
    saveManyToSyncStorage,
    saveToLocalStorage,
    saveToStorage,
    saveToSyncStorage
} from './storage-save';

export {
    getAllLocalStorage,
    getAllSyncStorage,
    getAllManagedStorage,
    getFromLocalStorage,
    getFromSyncStorage,
    getFromManagedStorage,
    getFromStorage,
    removeAllLocalStorage,
    removeAllSyncStorage,
    removeFromLocalStorage,
    removeFromSyncStorage,
    removeFromStorage,
    saveManyToLocalStorage,
    saveManyToSyncStorage,
    saveToLocalStorage,
    saveToSyncStorage,
    saveToStorage,
    saveManyToStorage,
    BasicTypes,
    StorageAvailableTypes,
    StorageObjectType,
    StorageType
};
