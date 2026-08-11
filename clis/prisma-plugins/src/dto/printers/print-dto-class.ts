import { DtoClassName } from '../../common/to-dto-class-name.js';

export function printDtoClass(dtoClassName: DtoClassName, properties: string) {
  return [`export class ${dtoClassName} {`, properties, '}'].join('\n');
}
