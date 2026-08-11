import { Any, DateFactory, KeyOf, ObjectType, ToAnyRecord } from './types.js';

export const PropTypes = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Date: 'Date',
  Buffer: 'Buffer',
  BigInt: 'BigInt',
  Array: 'Array',
} as const;

export type PropType = KeyOf<typeof PropTypes>;

export type PropStringFormat =
  | 'json'
  | 'email'
  | 'password'
  | 'uuid4'
  | 'uuid7'
  | 'iso8601'
  | 'date'
  | 'time';

export type PropNumberFormat = 'int' | 'rate' | 'percent' | 'fraction';

export type PropFormat = PropStringFormat | PropNumberFormat;

export type PropValidationOptions = {
  /**
   * By default all properties are optional
   */
  required?: boolean;

  /**
   * String or number format such as email, password, rate, percent etc.
   */
  format?: PropFormat;

  /**
   * Check the property value is equal to the given value
   */
  equalsTo?: string | number | DateFactory;

  /**
   * Defiens minimum number, string length, date, or if the option is set property name, then it checks the property value is more than the given property value.
   */
  moreThan?: string | number | DateFactory;

  /**
   * Defiens maximum number, string length, date, or if the option is set property name, then it checks the property value is less than the given property value.
   */
  lessThan?: string | number | DateFactory;

  /**
   * Defiens minimum number, string length, date, or if the option is set property name, then it checks the property value is more than or equal to the given property value.
   */
  moreThanOrEqualTo?: string | number | DateFactory;

  /**
   * Defiens maximum number, string length, date, or if the option is set property name, then it checks the property value is less than or equal to the given property value.
   */
  lessThanOrEqualTo?: string | number | DateFactory;

  /**
   * Check the value is in the given list
   */
  isIn?: (string | number)[];

  /**
   * Check the value is not validate with the given options
   */
  not?: PropValidationOptions;
};
export type PropOptions = {
  /**
   * Type is infered by reflection but array item type is required
   */
  type?: () => ObjectType;

  /**
   * @internal
   * The array type is inferred by reflection.
   */
  isArray?: boolean;

  /**
   * Dependencies
   */
  dependencies?: ToAnyRecord<Any>;

  /**
   * Validation and tranformation groups
   */
  groups?: string[];

  /**
   * By default all properties are exposed
   */
  exclude?: boolean;
} & PropValidationOptions;

export function propOptions(options: PropOptions): PropOptions {
  return options;
}
