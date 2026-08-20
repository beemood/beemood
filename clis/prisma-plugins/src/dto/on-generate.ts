import { names } from '@beemood/utils';
import { type GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { CreateDtoClassPrinter } from './printers/create-dto-printer.js';
import { DtoClassPrinter } from './printers/dto-class-printer.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value ?? '../src/generated/dto';
  const type = options.generator.config.type;

  if (type !== 'resapi' && type !== 'graphql') {
    throw new Error(`Type must be one of restapi or graphql`);
  }
  const datamodel = options.dmmf.datamodel;
  const models = datamodel.models;

  const contents: { code: string; filePath: string }[] = [];

  for (const model of models) {
    {
      const { kebab } = names(model.name);

      const filePath = `${kebab}/${kebab}-read.dto.ts`;
      const code = new DtoClassPrinter(model).print();
      contents.push({ code, filePath });
    }
    {
      const { kebab } = names(model.name);

      const filePath = `${kebab}/${kebab}-create.dto.ts`;
      const code = new CreateDtoClassPrinter(model).print();
      contents.push({ code, filePath });
    }
  }

  for (const c of contents) {
    const filePath = join(output, c.filePath);

    try {
      await mkdir(dirname(filePath), { recursive: true });
    } catch {
      //
    }
    await writeFile(filePath, c.code, {
      encoding: 'utf-8',
    });
  }
}
