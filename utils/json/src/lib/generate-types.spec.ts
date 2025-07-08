import { Directory, writeJsonFile, writeTextFile } from '@beemood/fs';
import { workspaceRoot } from '@nx/devkit';
import { rm } from 'fs/promises';
import { resolve } from 'path';
import { JsonSchema } from './json-schema.js';
import { generateTypes } from './generate-types.js';

describe('generateTypes', () => {
  const root = resolve(workspaceRoot, 'tmp', 'test', 'json', 'generate-types');
  const schemePath = resolve(root, 'main.schema.json');
  const outputPath = resolve(root, 'main.build.schema.json');

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should geneate types', async () => {
    const schema: JsonSchema = {
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
      },
      required: ['name'],

      definitions: {
        Property: {
          properties: {
            type: {
              enum: ['string', 'number', 'boolean'],
            },
          },
        },
      },
    };
    await writeJsonFile(schemePath, schema);
    const result = await generateTypes(schemePath, outputPath);

    expect(
      result
        .replaceAll(/\s{1,}/g, ' ')
        .replaceAll(/\n{1,}/g, ' ')
        .replaceAll(/\t{1,}/g, ' ')
        .trim()
    ).toEqual(
      `
        export type Property = { type?:'string'|'number'|'boolean'; }
        export type MainSchema = { 
            name:string;
            description?:string;
        }
        `
        .replaceAll(/\s{1,}/g, ' ')
        .replaceAll(/\n{1,}/g, ' ')
        .replaceAll(/\t{1,}/g, ' ')
        .trim()
    );
  });
});
