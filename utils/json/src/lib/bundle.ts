import { readJsonFile } from '@beemood/fs';
import { JsonSchema } from './json-schema.js';
import { names } from '@beemood/names';
import { basename } from 'path';

export const DEFINITIONS_PREFIX = '#/definitions/';

export function validateJsonPath(referencePath: string) {
  if (referencePath.length > 5 && referencePath.endsWith('.json')) {
    return;
  }
  throw new Error(`Invalid json reference path ${referencePath}`);
}

export function convertReferencePathIntoDefinitionPath(referencePath: string) {
  validateJsonPath(referencePath);
  const filename = basename(referencePath).split('.').slice(0, -1).join('');
  if (filename == undefined) {
    throw new Error(`Could not extract the filename from ${referencePath}!`);
  }

  return `${DEFINITIONS_PREFIX}${names(filename).pascalCase}`;
}

export function isDefinitionPath(referencePath: string) {
  return referencePath.startsWith(DEFINITIONS_PREFIX);
}

export function updateJsonSchemaReferencesToDefinitionPaths(
  schema: JsonSchema
) {
  const entries = Object.entries(schema);

  for (const [key, value] of entries) {
    if (key === '$ref') {
      if (isDefinitionPath(value) == false) {
        schema.$ref = convertReferencePathIntoDefinitionPath(value);
      }
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        updateJsonSchemaReferencesToDefinitionPaths(item);
      }
    } else if (typeof value === 'object') {
      updateJsonSchemaReferencesToDefinitionPaths(value);
    }
  }

  return schema;
}

export async function bundle(filepath: string): Promise<JsonSchema> {
  const mainSchema = await readJsonFile<JsonSchema>(filepath);

  // Convert $ref paths into definition paths
  {
    updateJsonSchemaReferencesToDefinitionPaths(mainSchema);
  }

  return mainSchema;
}
