import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Number Validation', () => {
  describe('Valid Number', () => {
    it.each`
      options                  | value
      ${{} as O}               | ${{ value: 1 }}
      ${{ minimum: 1 } as O}   | ${{ value: 1 }}
      ${{ maximum: 1 } as O}   | ${{ value: 1 }}
      ${{ enum: [1, 2] } as O} | ${{ value: 1 }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: number;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual(value);
      expect(errors).toEqual([]);
    });
  });
});
