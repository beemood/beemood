import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator';
import {
  registerDecorator,
  ValidatorConstraint
} from 'class-validator';

@ValidatorConstraint({ name: 'startsWith' })
export class StartsWithConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments) {
    const [prefix] = args.constraints;

    if (typeof value === 'string') {
      if (!value.startsWith(prefix)) {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [previx] = args.constraints;
    return `${args.property} must start with ${previx}`;
  }
}

export function StartsWith(
  prefix: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'startsWith',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [prefix],
      validator: StartsWithConstraint,
    });
  };
}
