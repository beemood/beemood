import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'notEndsWith' })
export class NotEndsWithConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const [suffix] = args.constraints;

    if (typeof value === 'string') {
      if (value.endsWith(suffix)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [suffix] = args.constraints;
    return `${args.property} must not end with ${suffix}`;
  }
}

export function NotEndsWith(
  suffix: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'notNotEndsWith',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [suffix],
      validator: NotEndsWithConstraint,
    });
  };
}
