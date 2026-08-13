import { ApiPropertyOptions } from '@nestjs/swagger';
import { NormalizedOptions } from '../validation/to-normalized-options.js';

export function toApiPropertyOptions(
  options: NormalizedOptions,
): ApiPropertyOptions {
  const apiPropertyOptions: ApiPropertyOptions = {};

  apiPropertyOptions.type = options.type;
  apiPropertyOptions.isArray = options.isArray;
  apiPropertyOptions.required = options.required === true ? true : false;

  return apiPropertyOptions;
}
