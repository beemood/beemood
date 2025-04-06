export type PropertyType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array';

export type ActualPropertyType<T = unknown> =
  | string
  | number
  | boolean
  | (T & object)
  | Array<T>;
