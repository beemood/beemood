import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: 'dependsOnProperties' })
export class DependsOnConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [propertyNames] = args.constraints;

    for (const p of propertyNames) {
      const v = (args.object as any)[p];
      if (v == undefined) return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const [propertyNames] = args.constraints;
    return `${args.property} depends on ${propertyNames}`;
  }
}

export function DependsOnProperties(
  propertyNames: string[],
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (...args) {
    const [object, propertyName] = args;

    registerDecorator({
      name: 'dependsOnProperties',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      constraints: [propertyNames],
      validator: DependsOnConstraint,
    });
  };
}
