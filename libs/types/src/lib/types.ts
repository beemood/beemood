// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = Readonly<any>;
export type Some<T> = Readonly<T | undefined | null>;
export type KeyOf<T> = Readonly<keyof T>;
export type Keys<T> = ReadonlyArray<KeyOf<T>>;

export type Obj = Any;

export type MapRecord<T, V> = Readonly<Record<KeyOf<T>, V>>;
export type StringRecord<T> = MapRecord<T, string>;
export type DateRecord<T> = MapRecord<T, Date>;
export type NumberRecord<T> = MapRecord<T, number>;
export type BooleanRecord<T> = MapRecord<T, boolean>;
export type BinaryRecord<T> = MapRecord<T, 1 | 0>;
export type ObjectRecord<T, O extends Obj> = MapRecord<T, O>;

/**
 * Case types
 */
export type Casings = Readonly<{
  normal: string;
  lower: string;
  upper: string;
  pascal: string;
  camel: string;
  kebab: string;
  snake: string;
  contant: string;
  title: string;
  sentence: string;
}>;

export type Casing = KeyOf<Casings>;
