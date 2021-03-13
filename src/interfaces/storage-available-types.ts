export type BasicTypes = string | number | boolean;
export type ObjectType = { [key: string]: StorageAvailableTypes };
export type StorageAvailableTypes = BasicTypes | BasicTypes[] | ObjectType;
