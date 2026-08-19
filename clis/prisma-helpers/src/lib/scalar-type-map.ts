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
export const BoxedTypeMap: Record<string, string> = {
  String: 'String',
  Json: 'String',
  Boolean: 'Boolean',
  BigInt: 'BigInt',
  Int: 'Number',
  Decimal: 'Number',
  Float: 'Number',
  DateTime: 'Date',
  Bytes: 'Buffer',
} as const;

export const PrimitiveTypeMap: Record<string, string> = {
  String: 'string',
  Json: 'string',
  Boolean: 'boolean',
  BigInt: 'bigint',
  Int: 'number',
  Decimal: 'number',
  Float: 'number',
  DateTime: 'Date',
  Bytes: 'Buffer',
} as const;
