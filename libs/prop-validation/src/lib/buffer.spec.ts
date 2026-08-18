import 'reflect-metadata';
import { type PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Buffer Validation', () => {
  describe('Valid', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ value: Buffer.from([]) }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: Buffer;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual(value);
      expect(errors).toEqual([]);
    });
  });

  describe('Invalid Buffer', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ value: 'some' }}
      ${{} as O} | ${{ value: {} }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: Buffer;
      }

      const { errors } = transformAndValidate(Sample, value);

      const constraints = errors.flatMap((e) =>
        Object.keys(e.constraints ?? {}),
      );
      for (const constraint of constraints) {
        expect(['isInstance']).include(constraint);
      }
    });
  });
});
