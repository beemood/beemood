import { definedOrThrow, isInOrThrow } from '@beemood/utils';
import { GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { printCommonDto } from './printers/print-common-dto.js';
import { printCreateDtoClass } from './printers/print-create-dto-class.js';
import { printEnumFilterDto } from './printers/print-enum-filter-dto.js';
import { printFindManyDto } from './printers/print-find-many-dto.js';
import { printFindUniquedto } from './printers/print-find-unique-dto.js';
import { printIncludedto } from './printers/print-include-dto.js';
import { printOmitDto } from './printers/print-omit-dto.js';
import { printOrderByDto } from './printers/print-order-by-dto.js';
import { printProjectionDto } from './printers/print-projection-dto.js';
import { printReadDtoClass } from './printers/print-read-dto-class.js';
import { printSelectDto } from './printers/print-select-dto.js';
import { printUpdateDtoClass } from './printers/print-update-dto-class.js';
import { printWhereDto } from './printers/print-where-dto.js';
import { printWhereManyRelationDto } from './printers/print-where-many-relation-dto.js';
import { printWhereUniqueDto } from './printers/print-where-unique-dto.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value ?? '../src/generated/dto';
  const type = definedOrThrow(options.generator.config.type);
  isInOrThrow(type, ['restapi', 'graphql']);
  const datamodel = options.dmmf.datamodel;

  const contents: string[] = [];

  contents.push(`import { Dto, Prop } from '@beemood/prop/${type}'`);
  contents.push(`import * as P from '../prisma/client.js'`);
  contents.push(`import * as C from '../prisma/commonInputTypes.js';`);

  {
    const code = printCommonDto('Dto');
    contents.push(code);
  }

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
