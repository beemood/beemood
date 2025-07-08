import { readJsonFile, writeJsonFile, writeTextFile } from '@beemood/fs';
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
        break;
      case 'integer':
        return 'number';
      case 'array': {
        if (!schema.items) {
          throw new Error(`Array property must have items options!`);
        }
        return `${getSchemaType(schema.items)}[]`;
      }
    }
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
