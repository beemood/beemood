import { isThen as __ } from '@bmod/is';
import type { StringOptions } from '@bmod/types';
import type { ValidationOptions } from 'class-validator';
import {
  Contains,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { EndsWith } from './custom/ends-with.validation.js';
import { NotEndsWith } from './custom/not-ends-with.validation.js';
import { NotStartsWith } from './custom/not-starts-with.validation.js';
import { StartsWith } from './custom/starts-with.validation.js';
import { StringFormatValidation } from './string-format-validation.decorator.js';

export function StringValidation(
  options: StringOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;

    IsString(vo)(...args);

    StringFormatValidation(options, vo)(...args);

    // General
    __(options.minLength, (v) => MinLength(v, vo)(...args));
    __(options.maxLength, (v) => MaxLength(v, vo)(...args));
    __(options.contains, (v) => Contains(v, vo)(...args));
    __(options.notContains, (v) => NotContains(v, vo)(...args));
    __<object>(options.enum, (v) => IsEnum(v, vo)(...args));

    // Regular expression
    __(options.pattern, (v) => Matches(v.toString(), undefined, vo)(...args));
    __(options.startsWith, (v) => StartsWith(v, vo)(...args));
    __(options.notStartsWith, (v) => NotStartsWith(v, vo)(...args));
    __(options.endsWith, (v) => EndsWith(v, vo)(...args));
    __(options.notEndsWith, (v) => NotEndsWith(v, vo)(...args));
  };
}
