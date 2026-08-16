const isValidIdentifier = (key: string): boolean =>
  /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);

export function toCode(value: unknown, indentLevel = 0): string {
  const pad = '  '.repeat(indentLevel);
  const nextPad = '  '.repeat(indentLevel + 1);

  if (value === undefined) return 'undefined';
  if (value === null) return 'null';

  const type = typeof value;

  if (type === 'number' || type === 'boolean') {
    return String(value);
  }

  if (type === 'bigint') {
    return `${value}n`;
  }

  if (type === 'string') {
    return JSON.stringify(value);
  }

  if (type === 'symbol') {
    const key = Symbol.keyFor(value);
    if (key !== undefined) {
      return `Symbol.for(${JSON.stringify(key)})`;
    }
    const description = value.description;
    return `Symbol(${description !== undefined ? JSON.stringify(description) : ''})`;
  }

  if (type === 'function') {
    return value.toString();
  }

  if (type === 'object') {
    // Dates
    if (value instanceof Date) {
      return `new Date(${JSON.stringify(value.toISOString())})`;
    }

    // RegExp
    if (value instanceof RegExp) {
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
    if (value instanceof Set) {
      const entries = Array.from(value)
        .map((item) => `${nextPad}${toCode(item, indentLevel + 1)}`)
        .join(',\n');
      return `new Set([\n${entries}\n${pad}])`;
    }

    // Map
    if (value instanceof Map) {
      const entries = Array.from(value.entries())
        .map(
          ([k, v]) =>
            `${nextPad}[${toCode(k, indentLevel + 1)}, ${toCode(v, indentLevel + 1)}]`,
        )
        .join(',\n');
      return `new Map([\n${entries}\n${pad}])`;
    }

    // Plain / Custom Objects
    const keys = Reflect.ownKeys(value);
    if (keys.length === 0) return '{}';

    const entries = keys
      .map((key) => {
        const val = (value as Record<string | symbol, unknown>)[key];
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

  return 'undefined';
}
