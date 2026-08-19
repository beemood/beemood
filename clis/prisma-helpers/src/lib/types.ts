import { type StringRecord } from '@beemood/types';
import { type DMMF } from '@prisma/generator-helper';
export type { DMMF } from '@prisma/generator-helper';

export type Field = DMMF.Field;
export type Model = DMMF.Model;
export type Datamodel = DMMF.Datamodel;
export type EnumValue = DMMF.EnumValue;
export type DatamodelEnum = DMMF.DatamodelEnum;
export type FieldDefault = DMMF.FieldDefault;
export type FieldDefaultScalar = DMMF.FieldDefaultScalar;
export type FieldKind = DMMF.FieldKind;

export const TsBoxType = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  BigInt: 'BigInt',
  Date: 'Date',
  Buffer: 'Buffer',
  Unkown: 'unkown',
} as const;

export const ScalarType = {
  String: 'String',
  Json: 'Json',
  Boolean: 'Boolean',
  BigInt: 'BigInt',
  Int: 'Int',
  Decimal: 'Decimal',
  Float: 'Float',
  DateTime: 'DateTime',
  Bytes: 'Bytes',
  Unsupported: 'unkown',
} as const;

export type ScalarType = keyof typeof ScalarType;

/**
 * The core scalar types available in the Prisma Schema are:
 *
 * String: Variable-length text. Maps to a JavaScript .
 * Boolean: True or false value. Maps to a JavaScript .
 * Int: Signed 32-bit integer. Maps to a JavaScript .
 * BigInt: Signed 64-bit integer. Maps to a JavaScript .
 * Float: Floating-point number. Maps to a JavaScript .
 * Decimal: High-precision decimal number. Maps to a object.
 * DateTime: Timestamp data (typically ISO 8601). Maps to a JavaScript .
 * Json: A JSON object or array. Maps to a JavaScript object.
 * Bytes: Binary data. Maps to a Node.js .
 * Unsupported: A type catch-all for native database types not natively supported by Prisma. Cannot be queried directly. [1, 3, 4, 5, 6]
 *
 * Type Modifiers
 *
 * You can alter how these scalar types behave using modifiers:
 * Optional: Add a after the type (e.g., ) to make the field nullable.
 * List / Array: Add after the type (e.g., ) to turn it into an array. (Note: Only supported on PostgreSQL, CockroachDB, and MongoDB). [7, 8, 9, 10, 11]
 */
export const ScalarBoxTypeMap: StringRecord<typeof ScalarType> = {
  String: 'String',
  Json: 'String',
  Boolean: 'Boolean',
  BigInt: 'BigInt',
  Int: 'Number',
  Decimal: 'Number',
  Float: 'Number',
  DateTime: 'Date',
  Bytes: 'Buffer',
  Unsupported: 'unkown',
} as const;

export const ScalarPrimitiveTypeMap: StringRecord<typeof ScalarType> = {
  String: 'string',
  Json: 'string',
  Boolean: 'boolean',
  BigInt: 'bigint',
  Int: 'number',
  Decimal: 'number',
  Float: 'number',
  DateTime: 'Date',
  Bytes: 'Buffer',
  Unsupported: 'unkown',
} as const;

export const FieldNativeType = {
  Bit: 'Bit',
  Char: 'Char',
  Citext: 'Citext',
  Inet: 'Inet',
  Text: 'Text',
  Uuid: 'Uuid',
  VarBit: 'VarBit',
  VarChar: 'VarChar',
  Xml: 'Xml',
  Date: 'Date',
  Time: 'Time',
  Timetz: 'Timetz',
  Timestamp: 'Timestamp',
  Timestamptz: 'Timestamptz',
  Decimal: 'Decimal',
  Money: 'Money',
  DoublePrecision: 'DoublePrecision',
  Real: 'Real',
  Json: 'Json',
  JsonB: 'JsonB',
  ByteA: 'ByteA',
} as const;

export type FieldNativeType = keyof typeof FieldNativeType;
