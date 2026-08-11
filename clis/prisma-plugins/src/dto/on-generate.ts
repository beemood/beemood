import { GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { printCreateDtoClass } from './printers/print-create-dto-class.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value ?? '../src/generated/dto';

  const datamodel = options.dmmf.datamodel;

  const contents: string[] = [];

  contents.push(`import { Prop } from '@beemood/prop'`);
  contents.push(`import * as P from '../prisma/client.js'`);

  for (const model of datamodel.models) {
    {
      const code = printCreateDtoClass(model);
      contents.push(code);
    }
  }

  try {
    await mkdir(output, { recursive: true });
  } catch {
    //
  }

  await writeFile(join(output, 'index.ts'), contents.join('\n\n'), {
    encoding: 'utf-8',
  });
}
