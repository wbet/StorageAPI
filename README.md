# StorageAPI

Wrapper over the Chrome and Browser storage API that aims to provide a straight forward approach of using the storage API.

For example chrome.storage.local.get on chrome uses a callback while on firefox returns a promise, this wrapper will return a promise for both of them.

# How to use

## Interfaces

All the available interfaces will be presented bellow in an explicit way.

```typescript
export type BasicTypes = string | number | boolean | string[] | number[] | boolean[];
export type StorageAvailableTypes = BasicTypes | StorageObjectType | StorageObjectType[];

// Represents an object with random keys that can have as value a basic type, an object like itself or an array of objects like itself.
export interface StorageObjectType {
    [key: string]: BasicTypes | StorageObjectType | StorageObjectType[];
}
```

## Enums

All the available enums will be presented bellow:

```typescript
export const enum StorageType {
    Local = 'local',
    Sync = 'sync',
    Managed = 'managed'
}
// used as a normal object with properties
StorageType.Sync;
// or with just the string
('sync');
```

## Available APIs

This set of functions aims to reduce the clutter in your code providing a straight forward approach of using the storage. All the functions will return a promise whenever possible.

## Save to storage

### Typescript

```typescript
function saveManyToLocalStorage(data: StorageObjectType);
function saveManyToSyncStorage(data: StorageObjectType);
function saveToLocalStorage(key: string, data: StorageAvailableTypes);
function saveToSyncStorage(key: string, data: StorageAvailableTypes);
function saveToStorage(key: string, data: StorageAvailableTypes, type: StorageType);
function saveManyToStorage(data: StorageObjectType, type: StorageType);
```

### Javascript

```javascript
function saveManyToLocalStorage(data)
function saveManyToSyncStorage(data)
function saveToLocalStorage(key, data)
function saveToSyncStorage(key, data)
function saveToStorage(key, data, type)
function saveManyToStorage(data, type)
```

### Example

```typescript
saveManyToLocalStorage({
    secretKey: 'secret value saved in local storage',
    obj: {
        date: '20/2/2020',
        value: 100,
        isItTrue: true
    }
});
saveManyToSyncStorage({
    secretKey: 'secret value synced across devices',
    obj: {
        date: '20/2/2020',
        value: 100,
        isItTrue: true
    }
});
saveToLocalStorage('secretKey', 'secret value synced across devices');
saveToSyncStorage('secretKey', 'secret value synced across devices'); // with string
saveToSyncStorage('obj', {
    date: '20/2/2020',
    value: 100,
    isItTrue: true
});

saveToStorage(
    'obj',
    {
        date: '20/2/2020',
        value: 100,
        isItTrue: true
    },
    StorageType.Sync
);

saveToStorage(
    'obj',
    {
        date: '20/2/2020',
        value: 100,
        isItTrue: true
    },
    'sync'
);

saveManyToStorage(
    {
        secretKey: 'secret value synced across devices',
        obj: {
            date: '20/2/2020',
            value: 100,
            isItTrue: true
        }
    },
    StorageType.Sync
);

// you can also chain actions using then. Take care, the promise returns void
saveToLocalStorage('secretKey', 'secret value synced across devices').then(() => {
    // action
});
```

## Remove from storage

### Typescript

```typescript
function removeAllLocalStorage();
function removeAllSyncStorage();
function removeFromLocalStorage(keys: string | string[]);
function removeFromSyncStorage(keys: string | string[]);
function removeFromStorage(keys?: string | string[], type: StorageType);
```

### Javascript

```javascript
function removeAllLocalStorage()
function removeAllSyncStorage()
function removeFromLocalStorage(keys)
function removeFromSyncStorage(keys)
function removeFromStorage(keys, type)
```

### Example

```typescript
removeAllLocalStorage();
removeAllSyncStorage();

removeFromLocalStorage('secretKey');
removeFromSyncStorage('secretKey');
removeFromSyncStorage('obj');
removeFromSyncStorage(['secretKey', 'obj']);

removeFromStorage('obj', StorageType.Sync);
removeFromStorage(['secretKey', 'obj'], StorageType.Sync);

// you can also chain actions using then. Take care, the promise returns void
removeAllLocalStorage().then(() => {
    // action
});
```

## Save to storage

### Typescript

```typescript
function getAllLocalStorage<T = StorageAvailableTypes>();
function getAllSyncStorage<T = StorageAvailableTypes>();
function getAllManagedStorage<T = StorageAvailableTypes>();
function getFromLocalStorage<T = StorageAvailableTypes>(keys: string | string[]);
function getFromSyncStorage<T = StorageAvailableTypes>(keys: string | string[]);
function getFromManagedStorage<T = StorageAvailableTypes>(keys: string | string[]);
function getFromStorage<T = StorageAvailableTypes>(keys?: string | string[], type: StorageType): Promise<StorageObjectType<T>>;
```

### Javascript

```javascript
function getAllLocalStorage()
function getAllSyncStorage()
function getAllManagedStorage()
function getFromLocalStorage(keys)
function getFromSyncStorage(keys)
function getFromManagedStorage(keys)
function getFromStorage(keys, type)
```

### Example

```typescript
// All functions return a promise with an object that contains the searched key and the value.
getAllLocalStorage().then((allLocalStorage) => {
    //...
});
getAllSyncStorage().then((x) => {
    //...
});
getAllManagedStorage().then((x) => {
    //...
});
getFromLocalStorage('secretKey').then((x) => {
    //...
});
getFromLocalStorage(['secretKey', 'obj']).then((x) => {
    //...
});
getFromSyncStorage('secretKey').then((x) => {
    //...
});
getFromManagedStorage('secretKey').then((x) => {
    //...
});
getFromStorage('secretKey', StorageType.Sync).then((x) => {
    //...
});

// Using async/await
const allLocalStorage = await getAllLocalStorage();

// Using generics
getFromLocalStorage<{ secretKey: string }>('secretKey').then((x) => {
    //...
});

type StoredObject = {
    date: string;
    value: number;
    isItTrue: boolean;
};
getFromLocalStorage<StoredObject>('obj').then((x) => {
    //...
});
//or
const storedObjectFromLocalStorage = await getFromLocalStorage<StoredObject>('obj');
```

# Importing the library

This library is available both as an unminified ES6 module and as a minfied libraries created by webpack.

-   Using the unminified ES6 module each individual functions can be imported own their own. This is very useful if you use modern TS/JS, especially with a bundling system that can remove unused functions.

```typescript
import { onMessage } from '@wbet/message-api/message-receiver';
```

-   The minified libraries are compatible with ES6, AMD, CommonJS and the script tag.

```typescript
// import using CommonJS(in nodeJS)
const storageApi = require('@wbet/storage-api');

// import using AMD
require(['storageApi'], (storageApi) => {
    // ...
});

// import using ES6 modules
import * as storageApi from '@wbet/storage-api';
```

```html
// import using the script tag - importing minified UML - I will use relative paths to exemplify
<script src="./dist/umd/index.min.js"></script>
<script>
    // The 'storageApi' library is added as a property to the window object
    window.storageApi.getFromStorageByKey(...)
    // ...
</script>

// import using the script tag - importing minified script from the Web folder - I will use relative paths to exemplify
<script src="./dist/web/index.min.js"></script>
<script>
     // The 'storageApi' library is saved in a global variable
    storageApi.getFromStorageByKey(...)
</script>

// if you want to load the script from a CDN you can use
<script src="https://unpkg.com/@wbet/storage-api/dist/umd/index.min.js"></script>

// or
<script src="https://unpkg.com/@wbet/storage-api/dist/web/index.min.js"></script>
```

# Final note

This library will be improved over time with APIs like connect and sendNativeMessage.

If you found any bug please open an issue and it will be addressed as soon as humanly possible.
