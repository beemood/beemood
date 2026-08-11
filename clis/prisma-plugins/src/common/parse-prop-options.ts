import { PropOptions } from '@beemood/types';
import { isRequiredField } from './is-required-field.js';
import { Field } from './types.js';

export function parsePropOptions(field: Field): PropOptions {
  const options: PropOptions = {};

  const doc = field.documentation ?? '';

  if (isRequiredField(field) || doc.match(/@required/i)) {
    options.required = true;
  }

  {
    const exp = /@min\((\d+)\)/i;

    const matched = doc.match(exp);
    if (matched) {
      const [, value] = matched;
      options.minLength = Number(value);
    }
  }

  return options;
}
