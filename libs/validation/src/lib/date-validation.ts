import type { DatePropertyOptions } from '@beemood/interface';
import type { ValidationOptions } from 'class-validator';
import { isDefined, IsISO8601, MaxDate, MinDate } from 'class-validator';

export function DateValidation(
  _options: DatePropertyOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (...args) => {
    IsISO8601({ strict: true }, validationOptions)(...args);

    const { futureDate, pastDate } = _options;

    if (isDefined(futureDate))
      MinDate(() => new Date(), validationOptions)(...args);

    if (isDefined(pastDate))
      MaxDate(() => new Date(), validationOptions)(...args);
  };
}
