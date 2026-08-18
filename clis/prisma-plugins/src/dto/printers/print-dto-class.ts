import { type DtoClassName } from '../../common/to-dto-class-name.js';

export type PrintDtoClassOptions = {
  name: DtoClassName;
  classDecorator?: string;
  properties?: string;
  extending?: string;
};
export function printDtoClass(
  dtoClassName: DtoClassName,
  properties: string,
  extendings = '',
) {
  extendings = extendings ? `extends ${extendings}` : '';

  return [`export class ${dtoClassName} ${extendings} {`, properties, '}'].join(
    '\n',
  );
}
