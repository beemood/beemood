// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;
export type Some<T> = T | undefined | null;
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;
export type KeyOf<T> = keyof T;
export type Keys<T> = KeyOf<T>[];

export type MapRecord<T, V> = Record<KeyOf<T>, V>;
export type StringRecord<T> = MapRecord<T, string>;
export type NumberRecord<T> = MapRecord<T, number>;
export type BooleanRecord<T> = MapRecord<T, boolean>;
export type BinaryRecord<T> = MapRecord<T, 1 | 0>;
