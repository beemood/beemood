/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'equalToProperty' })
export class EqualToPropertyConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyName] = args.constraints;

    if (value !== (args.object as any)[propertyName]) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [targetPropertyName] = args.constraints;
    return `${args.property} must be equal to ${targetPropertyName}`;
  }
}

export function EqualToProperty(
  targetPropertyName: string,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'equalToProperty',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [targetPropertyName],
      validator: EqualToPropertyConstraint,
    });
  };
}
