import { joinLines } from '../../common/join-lines.js';
import { DtoClassName } from '../../common/to-dto-class-name.js';

export function printDtoClass(dtoClassName: DtoClassName, properties: string) {
  return joinLines(`export class ${dtoClassName} {`, properties, '}');
}
