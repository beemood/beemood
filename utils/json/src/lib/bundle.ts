import { readJsonFile } from '@beemood/fs';
import { JsonSchema } from './json-schema.js';
import { names } from '@beemood/names';
import { basename } from 'path';

export const DEFINITIONS_PREFIX = '#/definitions/';

export function convertReferencePathIntoDefinitionPath(referencePath: string) {
  const filename = basename(referencePath).split('.').pop();

  if (filename == undefined) {
    throw new Error(`Could not extract the filename from ${referencePath}!`);
  }

  return `${DEFINITIONS_PREFIX}${names(filename).pascalCase}`;
}

export function isDefinitionPath(referencePath: string) {
  return referencePath.startsWith(DEFINITIONS_PREFIX);
}

export function convertReferencePathsIntoDefinitionPaths(schema: JsonSchema) {
  const entries = Object.entries(schema);

  for (const [key, value] of entries) {
    if (key === '$ref') {
      if (isDefinitionPath(value) == false) {
        schema.$ref = convertReferencePathIntoDefinitionPath(value);
      }
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        convertReferencePathIntoDefinitionPath(item);
      }
    } else if (typeof value === 'object') {
      convertReferencePathIntoDefinitionPath(value);
    }
  }
}

export async function bundle(filepath: string): Promise<JsonSchema> {
  const mainSchema = await readJsonFile<JsonSchema>(filepath);

  // Convert $ref paths into definition paths
  {
    convertReferencePathsIntoDefinitionPaths(mainSchema);
  }

  return mainSchema;
}
