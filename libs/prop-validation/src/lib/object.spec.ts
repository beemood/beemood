import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Object Validation', () => {
  class SubSample {
    @PropValidation() name: string;
  }

  describe('Valid', () => {
    it.each`
      options                           | value
      ${{ type: () => SubSample } as O} | ${{ value: { name: 'some' } }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: SubSample;
      }

      const { errors, instance } = transformAndValidate(Sample, value);
      expect({ ...instance }).toEqual(value);
      expect(errors).toEqual([]);
    });
  });
  describe('Invalid Object', () => {
    it.each`
      options                           | value
      ${{ type: () => SubSample } as O} | ${{ value: 'some' }}
      ${{ type: () => SubSample } as O} | ${{ value: {} }}
    `('$options | $value', ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: SubSample;
      }

      const { errors } = transformAndValidate(Sample, value);

      const constraints = errors.flatMap((e) =>
        Object.keys(e.constraints ?? {}),
      );
      for (const constraint of constraints) {
        expect(['isObject', 'nestedValidation']).include(constraint);
      }
    });
  });
});
