import { ValidationError } from 'class-validator';

export function getContraints(errors: ValidationError[]): string[] {
  return errors
    .map((e) => {
      return [
        ...Object.keys(e.constraints || {}),
        ...getContraints(e.children || []),
      ];
    })
    .flat();
}
