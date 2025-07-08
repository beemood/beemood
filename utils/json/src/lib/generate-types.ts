import { readJsonFile, writeTextFile } from '@beemood/fs';
import { JsonSchema } from './json-schema.js';
import { basename } from 'path';
import { names } from '@beemood/names';

export function getSchemaType(schema: JsonSchema): string {
  if (schema.type) {
    switch (schema.type) {
      case 'string':
      case 'number':
      case 'boolean':
        return schema.type;
      case 'object':
        return 'any';
      case 'integer':
        return 'number';
      case 'array': {
        if (schema.items) {
          return `${getSchemaType(schema.items)}[]`;
        } else {
          return `any[]`;
        }
      }
    }
  }

  if (schema.const) {
    if (typeof schema.const === 'string') {
      return `'${schema.const}'`;
    }
    return schema.const;
  }

  if (schema.enum) {
    return schema.enum
      .map((e) => {
        if (typeof e === 'string') {
          return `'${e}'`;
        }
        return `${e}`;
      })
      .join('|');
  }

  if (schema.$ref) {
    return schema.$ref.split('/').pop()!;
  }

  if (schema.properties) {
    const entries = Object.entries(schema.properties);

    const result = [`{`];

    for (const [key, value] of entries) {
      const isRequired = schema.required?.includes(key) ? '' : '?';
      result.push(`${key}${isRequired}:${getSchemaType(value)};`);
    }
    result.push('}');
    return result.join(' ');
  }

  if (schema.patternProperties) {
    let propertyName = 'string';

    if (schema.propertyNames) {
      const __newPropertyName = schema.propertyNames.$ref?.split('/').pop();
      if (__newPropertyName) {
        propertyName = __newPropertyName;
      }
    }

    return `Record<${propertyName},${getSchemaType(
      Object.values(schema.patternProperties)[0]
    )}>`;
  }
  if (schema.allOf) {
    const allOf = schema.allOf.map((e) => {
      return `& ${getSchemaType(e)}`;
    });
    return `(${allOf.join('')})`;
  }

  if (schema.oneOf) {
    const oneOf = schema.oneOf.map((e) => {
      return `| ${getSchemaType(e)}`;
    });
    return `(${oneOf.join('')})`;
  }

  return '';
}

export async function generateTypes(filepath: string, outputFilePath: string) {
  const typeName = names(
    basename(filepath).split('.').slice(0, -1).join('.')
  ).pascalCase;

  const result: string[] = [];

  const schema = await readJsonFile<JsonSchema>(filepath);

  if (schema.definitions) {
    const definitions = Object.entries(schema.definitions);
    for (const [key, value] of definitions) {
      result.push(`export type ${key} = ${getSchemaType(value)}`);
    }
  }

  result.push(`export type ${typeName} = ${getSchemaType(schema)}`);

  await writeTextFile(outputFilePath, result.join('\n\n'));

  return result.join('\n\n');
}
