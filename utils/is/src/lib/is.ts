import { type Optional, type Undefined } from '@beemood/types';

export const INDENTIFIER_EXP = /^[a-zA-Z_$]{1}[a-zA-Z0-9_$]{0,}$/;
export function isUndefined(value: unknown): value is Undefined {
  return value === undefined;
}

export function isNull(value: unknown): value is null {
  return value === null;
}

export function isDefined<T>(value: Optional<T>): value is T {
  return !isUndefined(value) && !isNull(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return false;
}

export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

export function isTypeOfFunction(value: unknown): value is FunctionConstructor {
  return typeof value === 'function';
}

export function isTypeOfObject(value: unknown): value is object {
  if (typeof value === 'object') {
    return true;
  }

  return false;
}

/**
 * Check the {@link value} is an arrow function
 * @param value
 * @returns
 */
export function isArrowFunction(value: unknown): value is FunctionConstructor {
  if (typeof value === 'function') {
    console.log(value.toString());
  }
  return isTypeOfFunction(value) && /^\(.*\)\s{0,}=>/.test(value.toString());
}

/**
 * Check the {@link value} is a named function (no-arrow function)
 * @param value
 * @returns
 */
export function isNamedFunction(value: unknown): value is FunctionConstructor {
  return isTypeOfFunction(value) && /^function/.test(value.toString());
}

/**
 * Check the {@link value} is a class method
 * @param value
 * @returns
 */
export function isMethod(value: unknown): value is FunctionConstructor {
  return isTypeOfFunction(value) && INDENTIFIER_EXP.test(value.name);
}

/**
 * Check the {@link value} is a regular or arrow function like `function some(...ags):*` or `()=>*`
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
 * Check the {@link value} is a class constructor (class type) such as `class A { }`
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

export function isObject(value: unknown): value is object {
  return value instanceof Object;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}

export const isValidIdentifier = (key: string): boolean =>
  INDENTIFIER_EXP.test(key);

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
