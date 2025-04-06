import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'endsWith' })
export class EndsWithConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const [suffix] = args.constraints;

    if (typeof value === 'string') {
      if (!value.endsWith(suffix)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [suffix] = args.constraints;
    return `${args.property} must end with ${suffix}`;
  }
}

export function EndsWith(
  suffix: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'endsWith',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [suffix],
      validator: EndsWithConstraint,
    });
  };
}
