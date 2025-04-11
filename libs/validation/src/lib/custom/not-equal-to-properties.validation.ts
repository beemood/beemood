import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator';
import {
  registerDecorator,
  ValidatorConstraint
} from 'class-validator';

@ValidatorConstraint({ name: 'notEqualToProperties' })
export class NotEqualToPropertiesConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [propertyNames] = args.constraints;

    for (const p of propertyNames) {
      const v = (args.object as any)[p];
      if (v == value) return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [propertyNames] = args.constraints;
    return `${args.property} must not equal to the properties ${propertyNames}`;
  }
}

export function NotEqualToPropertiesProperties(
  propertyNames: string[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'notEqualToProperties',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [propertyNames],
      validator: NotEqualToPropertiesConstraint,
    });
  };
}
