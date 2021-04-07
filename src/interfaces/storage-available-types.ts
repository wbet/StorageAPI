export interface StorageObjectType<T = any> {
    [key: string]: T;
}
export interface StorageChanges<T = any> {
    [key: string]: {
        oldValue?: T;
        newValue?: T;
    };
}
