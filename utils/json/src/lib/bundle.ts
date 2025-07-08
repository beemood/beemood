import { Directory, dirs, readJsonFile, writeJsonFile } from '@beemood/fs';
import { JsonSchema } from './json-schema.js';
import { basename, dirname, resolve } from 'path';
import { toDefinitionPaths } from './to-definition-paths.js';
import { names } from '@beemood/names';

export function bundleSchemas(
  mainSchema: JsonSchema,
  schemas: Directory<JsonSchema>[]
) {
  for (const d of schemas) {
    if (d.isFile) {
      if (!d.content) throw new Error(`${d.path} content is required!`);

      if (d.content !== mainSchema) {
        const definitionName = names(
          basename(d.path).split('.').slice(0, -1).join('')
        ).pascalCase;

        mainSchema.definitions = {
          ...mainSchema.definitions,
          ...d.content.definitions,
        };
        mainSchema.definitions![definitionName] = d.content;

        delete d.content.$schema;

        delete d.content.definitions;
      }
    } else if (d.isDirectory && d.children) {
      bundleSchemas(mainSchema, d.children);
    }
  }
}

export async function bundle(
  mainSchemaFilePath: string,
  outputSchemaFilepath: string
) {
  mainSchemaFilePath = resolve(mainSchemaFilePath);

  const mainSchema = await readJsonFile<JsonSchema>(mainSchemaFilePath);
  const root = dirname(mainSchemaFilePath);

  const allFilesAndDirectories = await dirs<JsonSchema>(root, {
    recursive: true,
    readJsonContent: true,
  });

  mainSchema.definitions = mainSchema.definitions ?? {};

  bundleSchemas(mainSchema, allFilesAndDirectories);

  toDefinitionPaths(mainSchema);

  await writeJsonFile(outputSchemaFilepath, mainSchema);
}
