import { Directory, readJsonFile, writeJsonFile } from '@beemood/fs';
import { workspaceRoot } from '@nx/devkit';
import { resolve } from 'path';
import { JsonSchema } from './json-schema.js';
import { bundle } from './bundle.js';
import { rm } from 'fs/promises';

describe('bundle', () => {
  const root = resolve(workspaceRoot, 'tmp', 'test', 'json', 'bundle');
  const schemaFiles: Pick<Directory<JsonSchema>, 'path' | 'content'>[] = [
    {
      path: resolve(root, './enums/names.schema.json'),
      content: {
        $schema: 'draft-7',
        enum: ['username', 'password'],
      },
    },
    {
      path: resolve(root, './property.schema.json'),
      content: {
        patternProperties: {
          '[a-z-]': {
            properties: {
              name: {
                $ref: './enum/names.schema.json',
              },
            },
          },
        },
      },
    },
  ];

  beforeAll(async () => {
    for (const d of schemaFiles) {
      await writeJsonFile(d.path, d.content);
    }
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should work', async () => {
    expect(1).toEqual(1);

    await bundle(
      resolve(root, './property.schema.json'),
      resolve(root, './property-build.schema.json')
    );

    expect(
      await readJsonFile(resolve(root, './property-build.schema.json'))
    ).toEqual({
      patternProperties: {
        '[a-z-]': {
          properties: { name: { $ref: '#/definitions/NamesSchema' } },
        },
      },
      definitions: {
        NamesSchema: { enum: ['username', 'password'] },
        PropertySchema: {
          patternProperties: {
            '[a-z-]': {
              properties: { name: { $ref: '#/definitions/NamesSchema' } },
            },
          },
        },
      },
    });
  });
});
