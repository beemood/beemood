import { type Optional } from '@beemood/types';
import { boxedTypes } from './box-types.js';

/**
 * Typescript indentifier regular expression
 */
export const INDENTIFIER_EXP = /^[a-zA-Z_$]{1}[a-zA-Z0-9_$]{0,}$/;

/**
 * Check the {@link key} is a valid typescript identifier
 *
 * @param key
 * @returns
 */
export const isValidIdentifier = (key: string): boolean =>
  INDENTIFIER_EXP.test(key);

/**
 * Determines if the {@link value} strictly equals to `undefined`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Determines if the {@link value} strictly equals to `null`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Determines if the {@link value} strictly neither `undefined nor `null`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isDefined<T>(value: Optional<T>): value is T {
  return !isUndefined(value) && !isNull(value);
}

/**
 * Determines if the {@link value} is a type of `string`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Determines if the {@link value} is a type of `number`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isNumber(value: unknown): value is number {
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return false;
}

/**
 * Determines if the {@link value} is a type of `bigint`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Determines if the {@link value} is a type of `boolean`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Determines if the {@link value} is a type of `symbol`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * Determines if the {@link value} is a type of `function`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isTypeOfFunction(value: unknown): value is FunctionConstructor {
  return typeof value === 'function';
}

/**
 * Determines if the {@link value} is a type of `object`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isTypeOfObject(value: unknown): value is object {
  if (typeof value === 'object') {
    return true;
  }

  return false;
}

/**
 * Determines if the {@link value} is a type of arrow function, `(...args:T[])=>R`,, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isArrowFunction(value: unknown): value is FunctionConstructor {
  return isTypeOfFunction(value) && /^\(.*\)\s{0,}=>/.test(value.toString());
}

/**
 * Determines if the {@link value} is a type of named-function,`function *(...args:T[])=>R`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isNamedFunction(value: unknown): value is FunctionConstructor {
  return isTypeOfFunction(value) && /^function/.test(value.toString());
}

/**
 * Determines if the {@link value} is a type of class method(function),`methodName(...args:T[]):R{ }`, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isMethod(value: unknown): value is FunctionConstructor {
  return isTypeOfFunction(value) && INDENTIFIER_EXP.test(value.name);
}

/**
 * Determines if the {@link value} is a type of {@link isArrowFunction } or {@link isNamedFunction}, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isFunction(value: unknown): value is FunctionConstructor {
  if (isTypeOfFunction(value)) {
    return isArrowFunction(value) || isNamedFunction(value);
  }
  return false;
}

/**
 * Determines if the {@link value} is a class constructor, exluding {@link boxedTypes}, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isClassConstructor(
  value: unknown,
): value is InstanceType<FunctionConstructor> {
  const __isClassConsturctor = (value: FunctionConstructor) => {
    return /^class/.test(value.toString());
  };

  return isTypeOfFunction(value) && __isClassConsturctor(value);
}

/**
 * Determines if the {@link value} is one of the {@link boxedTypes} type, yielding a boolean result.
 *
 * @param value
 * @returns
 */
export function isBoxedTypeConstructor<T extends FunctionConstructor>(
  value: unknown,
): value is InstanceType<T> {
  if (boxedTypes.includes(value as InstanceType<FunctionConstructor>)) {
    return true;
  }

  return false;
}

export function isBoxedInstance<T extends FunctionConstructor>(
  value: unknown,
): value is T {
  for (const b of boxedTypes) {
    if (value instanceof b) {
      return true;
    }
  }

  return false;
}

/**
 * Determines if the {@link value} is an instance of {@link Object}, yielding a boolean result.
 * @param value
 * @returns
 */
export function isObjectInstance(value: unknown): value is object {
  return value instanceof Object && value.constructor.name === Object.name;
}

// export function toCode(value: unknown, indentLevel = 0): string {
//   const pad = '  '.repeat(indentLevel);
//   const nextPad = '  '.repeat(indentLevel + 1);

//   if (value == undefined) return 'undefined';
//   if (value == null) return 'null';

//   const type = typeof value;

//   if (type == 'number' || type == 'boolean') {
//     return String(value);
//   }

//   if (type == 'bigint') {
//     return `${value}n`;
//   }

//   if (type == 'string') {
//     return JSON.stringify(value);
//   }

//   if (type == 'symbol') {
//     const key = Symbol.keyFor(value);
//     if (key != undefined) {
//       return `Symbol.for(${JSON.stringify(key)})`;
//     }
//     const description = value.description;
//     return `Symbol(${description != undefined ? JSON.stringify(description) : ''})`;
//   }

//   if (type == 'function') {
//     return value.toString();
//   }

//   if (type == 'object') {
//     // Dates
//     if (value instanceof Date) {
//       return `new Date(${JSON.stringify(value.toISOString())})`;
//     }

//     // RegExp
//     if (value instanceof RegExp) {
//       return value.toString();
//     }

//     // Arrays
//     if (Array.isArray(value)) {
//       if (value.length == 0) return '[]';
//       const items = value
//         .map((item) => `${nextPad}${toCode(item, indentLevel + 1)}`)
//         .join(',\n');
//       return `[\n${items}\n${pad}]`;
//     }

//     // Set
//     if (value instanceof Set) {
//       const entries = Array.from(value)
//         .map((item) => `${nextPad}${toCode(item, indentLevel + 1)}`)
//         .join(',\n');
//       return `new Set([\n${entries}\n${pad}])`;
//     }

//     // Map
//     if (value instanceof Map) {
//       const entries = Array.from(value.entries())
//         .map(
//           ([k, v]) =>
//             `${nextPad}[${toCode(k, indentLevel + 1)}, ${toCode(v, indentLevel + 1)}]`,
//         )
//         .join(',\n');
//       return `new Map([\n${entries}\n${pad}])`;
//     }

//     // Plain / Custom Objects
//     const keys = Reflect.ownKeys(value);
//     if (keys.length == 0) return '{}';

//     const entries = keys
//       .map((key) => {
//         const val = (value as Record<string | symbol, unknown>)[key];
//         const formattedKey =
//           typeof key == 'symbol'
//             ? `[${toCode(key)}]`
//             : isValidIdentifier(key)
//               ? key
//               : JSON.stringify(key);

//         return `${nextPad}${formattedKey}: ${toCode(val, indentLevel + 1)}`;
//       })
//       .join(',\n');

//     return `{\n${entries}\n${pad}}`;
//   }

//   return 'undefined';
// }
