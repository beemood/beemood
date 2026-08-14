import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('String validation', () => {
  describe('Valid input', () => {
    it.each`
      keyOptions                                                          | valueOptions               | value
      ${undefined}                                                        | ${undefined}               | ${{ key: undefined, value: undefined }}
      ${undefined}                                                        | ${undefined}               | ${{ key: null, value: null }}
      ${{ required: true, dependencies: { notEqualTo: ['value'] } } as O} | ${{ required: true } as O} | ${{ key: 's', value: 'd' }}
      ${{} as O}                                                          | ${{} as O}                 | ${{ key: 'some', value: 'some' }}
    `(
      'should validate $value with $keyOptions and $valueOptions',
      ({ keyOptions, valueOptions, value }) => {
        class Sample {
          @PropValidation(keyOptions) key: string;
          @PropValidation(valueOptions) value: string;
        }

        const { errors, instance } = transformAndValidate(Sample, value);

        expect(instance).toEqual(value);
        expect(errors).toEqual([]);
      },
    );
  });
});
