import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: T,
) {
  const instance = plainToInstance(type, value, {
    excludeExtraneousValues: true,
    strategy: 'excludeAll',
    exposeUnsetFields: false,
  });

  return {
    instance,
    errors: validateSync(instance),
  };
}
