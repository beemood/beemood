import { type GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { printCreateDtoClass } from './printers-fns/print-create-dto-class.js';
import { printEnumFilterDto } from './printers-fns/print-enum-filter-dto.js';
import { printFindManyDto } from './printers-fns/print-find-many-dto.js';
import { printFindUniquedto } from './printers-fns/print-find-unique-dto.js';
import { printIncludedto } from './printers-fns/print-include-dto.js';
import { printOmitDto } from './printers-fns/print-omit-dto.js';
import { printOrderByDto } from './printers-fns/print-order-by-dto.js';
import { printProjectionDto } from './printers-fns/print-projection-dto.js';
import { printReadDtoClass } from './printers-fns/print-read-dto-class.js';
import { printSelectDto } from './printers-fns/print-select-dto.js';
import { printUpdateDtoClass } from './printers-fns/print-update-dto-class.js';
import { printWhereDto } from './printers-fns/print-where-dto.js';
import { printWhereManyRelationDto } from './printers-fns/print-where-many-relation-dto.js';
import { printWhereUniqueDto } from './printers-fns/print-where-unique-dto.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value ?? '../src/generated/dto';
  const type = options.generator.config.type;

  if (type !== 'resapi' && type !== 'graphql') {
    throw new Error(`Type must be one of restapi or graphql`);
  }

  const datamodel = options.dmmf.datamodel;

  const contents: string[] = [];

  contents.push(`import { Dto, Prop } from '@beemood/prop/${type}'`);
  contents.push(`import * as P from '../prisma/client.js'`);
  contents.push(`import * as C from '../prisma/commonInputTypes.js';`);

  for (const enumModel of datamodel.enums) {
    const code = printEnumFilterDto(enumModel);
    contents.push(code);
  }

  for (const model of datamodel.models) {
    {
      const code = printReadDtoClass(model);
      contents.push(code);
    }
    {
      const code = printCreateDtoClass(model);
      contents.push(code);
    }

    {
      const code = printUpdateDtoClass(model);
      contents.push(code);
    }
    {
      const code = printWhereUniqueDto(model);
      contents.push(code);
    }
    {
      const code = printWhereDto(model);
      contents.push(code);
    }

    {
      const code = printOrderByDto(model);
      contents.push(code);
    }

    {
      const code = printWhereManyRelationDto(model);
      contents.push(code);
    }

    {
      const code = printSelectDto(model);
      contents.push(code);
    }
    {
      const code = printOmitDto(model);
      contents.push(code);
    }
    {
      const code = printIncludedto(model);
      contents.push(code);
    }

    {
      const code = printProjectionDto(model);
      contents.push(code);
    }

    {
      const code = printFindManyDto(model);
      contents.push(code);
    }

    {
      const code = printFindUniquedto(model);
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
