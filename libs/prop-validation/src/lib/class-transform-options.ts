import { ClassTransformOptions } from 'class-transformer';

export const CLASS_TRANSFORM_OPTIONS: ClassTransformOptions = {
  excludeExtraneousValues: true,
  exposeUnsetFields: false,
};
