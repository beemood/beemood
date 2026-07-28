import { DtoClassName } from '../../common/to-dto-class-name.js';

export function printDtoClass(
  dtoClassName: DtoClassName,
  properties: string,
  extendings: string = '',
) {
  extendings = extendings ? `extends ${extendings}` : '';

  return [
    '@Dto()',
    `export class ${dtoClassName} ${extendings} {`,
    properties,
    '}',
  ].join('\n');
}
