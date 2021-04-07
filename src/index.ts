import { StorageType } from './enums/storage-type';
import { StorageChanges, StorageObjectType } from './interfaces/storage-available-types';
import { getFromStorageByKey, getFromStorageByKeys, onChange } from './storage-get';
import { removeAllFromStorage, removeFromStorage } from './storage-remove';
import { saveManyToStorage, saveToStorage } from './storage-save';

export { getFromStorageByKey, onChange, getFromStorageByKeys, removeAllFromStorage, removeFromStorage, saveToStorage, saveManyToStorage, StorageObjectType, StorageType, StorageChanges };
