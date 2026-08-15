import {
  isDefined,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function LessThan(
  propertyName: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    registerDecorator({
      name: 'lessThan',
      target: args[0].constructor,
      propertyName: args[1].toString(),
      options: validationOptions,
      constraints: [propertyName],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [propertyName] = args.constraints;
          const targetValue = (args.object as any)[propertyName];

          if (isDefined(targetValue)) {
            if (
              typeof value === 'number' ||
              typeof value === 'bigint' ||
              value instanceof Date
            ) {
              return value < targetValue;
            }
          }

          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const [propertyName] = args.constraints;
          return `${args.property} value shuold be less than ${propertyName}`;
        },
      },
    });
  };
}
