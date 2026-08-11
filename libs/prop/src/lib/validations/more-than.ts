import { Any } from '@beemood/types';
import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function MoreThan(
  propertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    registerDecorator({
      name: 'moreThan',
      target: args[0].constructor,
      propertyName: args[1].toString(),
      options: validationOptions,
      constraints: [propertyName],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [propertyName] = args.constraints;
          const targetValue = (args.object as Any)[propertyName];

          if (isDefined(targetValue))
            if (
              typeof value === 'number' ||
              typeof value === 'bigint' ||
              value instanceof Date
            ) {
              return value > targetValue;
            }

          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const [propertyName] = args.constraints;
          return `${args.property} value shuold be more than ${propertyName}`;
        },
      },
    });
  };
}
