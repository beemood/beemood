import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator';
import {
  registerDecorator,
  ValidatorConstraint
} from 'class-validator';

@ValidatorConstraint({ name: 'notStartsWith' })
export class NotStartsWithConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const [prefix] = args.constraints;

    if (typeof value === 'string') {
      if (value.startsWith(prefix)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [previx] = args.constraints;
    return `${args.property} must not start with ${previx}`;
  }
}

export function NotStartsWith(
  prefix: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'notStartsWith',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [prefix],
      validator: NotStartsWithConstraint,
    });
  };
}
