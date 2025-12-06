import { Datamodel } from '../common/dmmf.js';
import { printCreateDto } from './print-create-dto.js';
import { printReadDto } from './print-read-dto.js';
import { printUpdateDto } from './print-update-dto.js';

export function generateSwagger(datamodel: Datamodel, project: string) {
  const swaggerDtos = datamodel.models
    .map((model) => {
      return [
        printReadDto(model),
        printCreateDto(model),
        printUpdateDto(model),
      ].join('\n');
    })
    .join('\n\n');

  return [
    `import * as P from './prisma/client.js'`,
    `import { ApiProperty } from '@nestjs/swagger';`,
    `import * as T from '@beemood/types';`,
    '',
    '',
    swaggerDtos,
  ].join('\n');
}
