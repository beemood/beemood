import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function BufferMinLength(
  minLengh: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    registerDecorator({
      name: 'bufferMinLength',
      target: args[0].constructor,
      propertyName: args[1].toString(),
      options: validationOptions,
      constraints: [minLengh],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Buffer.isBuffer(value)) return false;

          const [minLengh] = args.constraints;
          const byteLength = value.length;

          if (byteLength < minLengh) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [minLengh] = args.constraints;

          return `${args.property} buffer size must be at lest ${minLengh}`;
        },
      },
    });
  };
}
