import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Date Validation', () => {
  describe('Valid', () => {
    const dateValue = new Date();
    it.each`
      options    | value
      ${{} as O} | ${{ value: dateValue.toISOString() }}
      ${{} as O} | ${{ value: dateValue.getTime() }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: Date;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual({ value: dateValue });
      expect(errors).toEqual([]);
    });
  });
});
