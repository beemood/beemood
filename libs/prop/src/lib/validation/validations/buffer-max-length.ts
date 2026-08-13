import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function BufferMaxLength(
  maxLength: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    registerDecorator({
      name: 'bufferMaxLength',
      target: args[0].constructor,
      propertyName: args[1].toString(),
      options: validationOptions,
      constraints: [maxLength],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Buffer.isBuffer(value)) return false;

          const [maxLength] = args.constraints;
          const byteLength = value.length;

          if (byteLength > maxLength) return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [maxLength] = args.constraints;

          return `${args.property} buffer size must be at most ${maxLength}`;
        },
      },
    });
  };
}
