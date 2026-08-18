import { type PropValidationOptions } from '@beemood/prop-validation';
import { type ApiPropertyOptions } from '@nestjs/swagger';

export function toApiProperyOptions(
  options: PropValidationOptions,
): ApiPropertyOptions {
  const { type, required } = options;

  return {
    ...options,
    type,
    required: required === true,
  } as ApiPropertyOptions;
}
