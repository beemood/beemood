import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface
} from 'class-validator';
import {
  registerDecorator,
  ValidatorConstraint
} from 'class-validator';

@ValidatorConstraint({ name: 'notWithProperties' })
export class NotWithConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyNames] = args.constraints;

    for (const p of propertyNames) {
      const v = (args.object as any)[p];
      if (v != undefined) return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [propertyNames] = args.constraints;
    return `${args.property} cannot be used with ${propertyNames}`;
  }
}

export function NotWithProperties(
  propertyNames: string[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'notWithProperties',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [propertyNames],
      validator: NotWithConstraint,
    });
  };
}
