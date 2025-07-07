import { plainToInstance } from 'class-transformer';
import { StringOptions as O } from './string-validation.js';
import { Validation } from './validation.js';
import { validateSync } from 'class-validator';
import { getContraints } from './test-utils.js';

describe('StringValiation', () => {
  describe('valid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{ type: 'string' } as O}
      ${null}      | ${{ type: 'string' } as O}
      ${''}        | ${{ type: 'string' } as O}
      ${'  '}      | ${{ type: 'string' } as O}
      ${'1'}       | ${{ type: 'string' } as O}
      ${'some'}    | ${{ type: 'string', maxLength: 4 } as O}
      ${'some'}    | ${{ type: 'string', minLength: 4 } as O}
    `('should validate $value with $options', ({ value, options }) => {
      class Sample {
        @Validation(options)
        value: string;
      }

      const instance = plainToInstance(Sample, { value });
      const errors = validateSync(instance);
      expect(errors).toHaveLength(0);
    });
  });

  describe('invalid cases', () => {
    it.each`
      value        | options                                                | errors
      ${0}         | ${{ type: 'string' } as O}                             | ${['isString']}
      ${true}      | ${{ type: 'string' } as O}                             | ${['isString']}
      ${{}}        | ${{ type: 'string' } as O}                             | ${['isString']}
      ${undefined} | ${{ type: 'string', required: true } as O}             | ${['isDefined', 'isString', 'isNotEmpty']}
      ${null}      | ${{ type: 'string', required: true } as O}             | ${['isDefined', 'isString', 'isNotEmpty']}
      ${''}        | ${{ type: 'string', required: true } as O}             | ${['isNotEmpty']}
      ${'  '}      | ${{ type: 'string', required: true, trim: true } as O} | ${['isNotEmpty']}
      ${'some'}    | ${{ type: 'string', maxLength: 4 } as O}               | ${[]}
      ${'some'}    | ${{ type: 'string', minLength: 4 } as O}               | ${[]}
    `('should validate $value with $options', ({ value, options, errors }) => {
      class Sample {
        @Validation(options)
        value: string;
      }

      const instance = plainToInstance(Sample, { value });
      const foundErrors = validateSync(instance);
      const constraints = getContraints(foundErrors);
      expect(constraints).toEqual(errors);
    });
  });
});
