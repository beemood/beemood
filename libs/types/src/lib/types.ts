export type Optional<T> = T | undefined;

export type Nullable<T> = T | null;

export type Some<T> = T | null | undefined;

export type KeyOf<T> = keyof T;

export type Keys<T> = (keyof T)[];

export type ToRecord<T extends object, V> = {
  [K in keyof T]: V;
};

export type SymbolRecord<T extends object> = {
  [K in keyof T]: symbol;
};
export type BigIntRecord<T extends object> = {
  [K in keyof T]: bigint;
};
export type StringRecord<T extends object> = {
  [K in keyof T]: string;
};
export type DateRecord<T extends object> = {
  [K in keyof T]: Date;
};
export type NumberRecord<T extends object> = {
  [K in keyof T]: number;
};
export type BooleanRecord<T extends object> = {
  [K in keyof T]: boolean;
};
export type BinaryRecord<T extends object> = {
  [K in keyof T]: 1 | 0;
};
export type ObjectRecord<T extends object, O extends object> = {
  [K in keyof T]: O;
};

export type NonNullableRecord<T extends object> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type AnyRecord<T extends object> = {
  [K in keyof T]: unknown;
};

/**
 * Make some properties requried
 */
export type RequiredProperties<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};

/**
 * Make some properties optional
 */
export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

export type Imutable<T> = {
  readonly [P in keyof T]: Imutable<T[P]>;
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

export type Casing = KeyOf<Casings>;

export type ValueFactory<T> = () => T;

export type ValueOrFactory<T> = T | (() => T);

export type EmptyString = '';

export interface ClassConstructor<T extends object> {
  new (...args: any[]): T;
}
