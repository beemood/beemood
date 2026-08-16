export type Optional<T> = T | undefined;

export type Nullable<T> = T | null;

export type Some<T> = T | null | undefined;

export type KeyOf<T> = keyof T;

export type Keys<T> = Array<KeyOf<T>>;

export type ToRecord<T extends object, V> = {
  [K in keyof T]: V;
};

export type SymbolRecord<T extends object> = ToRecord<T, symbol>;
export type BigIntRecord<T extends object> = ToRecord<T, bigint>;
export type StringRecord<T extends object> = ToRecord<T, string>;
export type DateRecord<T extends object> = ToRecord<T, Date>;
export type NumberRecord<T extends object> = ToRecord<T, number>;
export type BooleanRecord<T extends object> = ToRecord<T, boolean>;
export type BinaryRecord<T extends object> = ToRecord<T, 1 | 0>;
export type ObjectRecord<T extends object, O extends object> = ToRecord<T, O>;

export type ToNonNullable<T extends object> = ToRecord<T, NonNullable<T>>;

export type ToAnyRecord<T extends object> = ToRecord<T, unknown>;

/**
 * Make some properties requried
 */
export type RequiredProperties<T, K extends KeyOf<T>> = Omit<T, K> & {
  [P in K]-?: T[P];
};

/**
 * Make some properties optional
 */
export type OptionalProperties<T, K extends KeyOf<T>> = Omit<T, K> & {
  [P in K]?: T[P];
};

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
