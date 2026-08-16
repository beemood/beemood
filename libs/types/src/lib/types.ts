// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;
export type Obj = object;

export type Undefined = undefined | null;

export type Some<T> = T | Undefined;

export type Optional<T> = T | Undefined;

export type KeyOf<T> = keyof T;

export type Keys<T> = Array<KeyOf<T>>;

export type MapRecord<T extends object, V> = Record<KeyOf<T>, V>;

export type ToStringRecord<T extends object> = MapRecord<T, string>;
export type ToDateRecord<T extends object> = MapRecord<T, Date>;
export type ToNumberRecord<T extends object> = MapRecord<T, number>;
export type ToBooleanRecord<T extends object> = MapRecord<T, boolean>;
export type ToBinaryRecord<T extends object> = MapRecord<T, 1 | 0>;
export type ToObjectRecord<T extends object, O extends Obj> = MapRecord<T, O>;

export type ToNonNullable<T extends object> = MapRecord<T, NonNullable<T>>;

export type ToAnyRecord<T extends object> = MapRecord<T, Any>;

export type PickRequired<T, K extends KeyOf<T>> = T & Required<Pick<T, K>>;

export type PickPartial<T, K extends KeyOf<T>> = Omit<T, K> &
  Partial<Pick<T, K>>;

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export type Imutable<T> = {
  readonly [P in keyof T]: T[P];
};

export type PropertyDecoratorTarget = Parameters<PropertyDecorator>[0];
export type PropertyDecoratorPropertyKey = Parameters<PropertyDecorator>[1];

export type MethodDecoratorTarget = Parameters<MethodDecorator>[0];
export type MethodDecoratorPropertyKey = Parameters<MethodDecorator>[1];

export type ClassDecoratorTarget = Parameters<ClassDecorator>[0];

export interface Type<T = Any> {
  new (...args: Any[]): T;
}

/**
 * Case types
 */
export type Casings = {
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
  dot: string;
};

export const PrimitiveType = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Date: 'Date',
  Buffer: 'Buffer',
};

export type PrimitiveType = keyof typeof PrimitiveType;

export type Casing = KeyOf<Casings>;

export type ValueFactory<T> = () => T;

export type ValueOrFactory<T> = T | (() => T);

export type EmptyString = '';
