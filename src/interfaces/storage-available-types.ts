export type BasicTypes = string | number | boolean | string[] | number[] | boolean[];
export interface StorageObjectType<T = StorageAvailableTypes> {
    [key: string]: T;
}
export type StorageAvailableTypes = BasicTypes | StorageObjectType | StorageObjectType[] | object | object[];
