import helper from '@prisma/generator-helper';
import { writeFile } from 'fs/promises';
import { generateSwagger } from './swagger/swagger.js';
import { generateZod } from './zod/zod.js';

export type Kind = 'zod' | 'swagger';

helper.generatorHandler({
  onGenerate: async (options) => {
    const { kind, project } = options.generator.config;
    const output = options.generator.output?.value;

    switch (kind as Kind) {
      case 'zod': {
        await writeFile(
          output || '../src/lib/zod.ts',
          generateZod(options.dmmf.datamodel)
        );

        break;
      }
      case 'swagger': {
        await writeFile(
          output || '../src/lib/swagger.ts',
          generateSwagger(options.dmmf.datamodel, project as string)
        );
        break;
      }
      default: {
        throw new Error(`${kind} is not supported!`);
      }
    }
  },

  onManifest: () => ({
    prettyName: 'Beemood Generators',
    config: {
      project: {
        type: 'string',
        required: true,
      },
      kind: {
        type: 'string',
        enum: ['zod', 'swagger'],
        required: true,
      },
    },
  }),
});
