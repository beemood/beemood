import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Boolean Validation', () => {
  describe('Valid', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ value: true }}
      ${{} as O} | ${{ value: false }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual(value);
      expect(errors).toEqual([]);
    });

    it.each`
      options    | value
      ${{} as O} | ${{ value: 'true' }}
      ${{} as O} | ${{ value: '1' }}
      ${{} as O} | ${{ value: 1 }}
      ${{} as O} | ${{ value: 100 }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual({ value: true });
      expect(errors).toEqual([]);
    });

    it.each`
      options    | value
      ${{} as O} | ${{ value: '' }}
      ${{} as O} | ${{ value: '   ' }}
      ${{} as O} | ${{ value: 'false' }}
      ${{} as O} | ${{ value: '0' }}
      ${{} as O} | ${{ value: '-1' }}
      ${{} as O} | ${{ value: -1 }}
      ${{} as O} | ${{ value: -100 }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual({ value: false });
      expect(errors).toEqual([]);
    });
  });

  describe('Invalid Boolean', () => {
    it.each`
      options    | value
      ${{} as O} | ${{ value: 'some' }}
      ${{} as O} | ${{ value: {} }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: boolean;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect(instance).toEqual(value);

      const constraints = errors.flatMap((e) =>
        Object.keys(e.constraints ?? {}),
      );
      for (const constraint of constraints) {
        expect(['isBoolean']).include(constraint);
      }
    });
  });
});
