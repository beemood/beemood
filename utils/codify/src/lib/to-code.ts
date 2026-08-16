import {
  isBigInt,
  isBoolean,
  isBoxedInstance,
  isClassConstructor,
  isDefined,
  isFunction,
  isNull,
  isNumber,
  isObjectInstance,
  isString,
  isSymbol,
  isUndefined,
  isValidIdentifier,
} from '@beemood/is';
import { isDate, isMap, isRegExp, isSet } from 'node:util/types';

/**
 * Transform the {@link value} into typescript code systax
 *
 * @param value
 * @param indentLevel
 * @returns
 */
export function toCode(value: unknown, indentLevel = 0): string {
  const pad = '  '.repeat(indentLevel);
  const nextPad = '  '.repeat(indentLevel + 1);

  if (isUndefined(value)) return 'undefined';

  if (isNull(value)) return 'null';

  if (isNumber(value) || isBoolean(value)) {
    return String(value);
  }

  if (isBigInt(value)) {
    return `${value}n`;
  }

  if (isString(value)) {
    return JSON.stringify(value);
  }

  if (isSymbol(value)) {
    const key = Symbol.keyFor(value);
    if (isDefined(key)) {
      return `Symbol.for(${JSON.stringify(key)})`;
    }
    const description = value.description;
    return `Symbol(${isDefined(description) ? JSON.stringify(description) : ''})`;
  }

  if (isFunction(value)) {
    return value.toString();
  }

  if (isBoxedInstance(value)) {
    // Dates
    if (isDate(value)) {
      return `new Date(${JSON.stringify(value.toISOString())})`;
    }

    // RegExp
    if (isRegExp(value)) {
      return value.toString();
    }

    // Arrays
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = value
        .map((item) => `${nextPad}${toCode(item, indentLevel + 1)}`)
        .join(',\n');
      return `[\n${items}\n${pad}]`;
    }

    // Set
    if (isSet(value)) {
      const entries = Array.from(value)
        .map((item) => `${nextPad}${toCode(item, indentLevel + 1)}`)
        .join(',\n');
      return `new Set([\n${entries}\n${pad}])`;
    }

    // Map
    if (isMap(value)) {
      const entries = Array.from(value.entries())
        .map(
          ([k, v]) =>
            `${nextPad}[${toCode(k, indentLevel + 1)}, ${toCode(v, indentLevel + 1)}]`,
        )
        .join(',\n');
      return `new Map([\n${entries}\n${pad}])`;
    }

    if (isObjectInstance(value)) {
      const keys = Object.keys(value);

      if (keys.length === 0) return '{}';

      const entries = keys
        .map((key) => {
          const val = (value as unknown as Record<string | symbol, unknown>)[
            key
          ];
          const formattedKey =
            typeof key === 'symbol'
              ? `[${toCode(key)}]`
              : isValidIdentifier(key)
                ? key
                : JSON.stringify(key);

          return `${nextPad}${formattedKey}: ${toCode(val, indentLevel + 1)}`;
        })
        .join(',\n');

      return `{\n${entries}\n${pad}}`;
    }
  }

  if (isClassConstructor(value)) {
    return value.name;
  }

  return 'undefined';
}
