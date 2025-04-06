import { BooleanOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('BooleanValidation | Invalid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<BooleanOptions, 'type'>, string[]];

  const validTestData: TestData[] = [
    [1, { value: 1 }, {}, ['isBoolean']],
    [1, { value: 'some' }, {}, ['isBoolean']],
    [1, { value: {} }, {}, ['isBoolean']],
    [1, { value: [] }, {}, ['isBoolean']],
  ];

  it.each(validTestData)(
    '%d | should not validate %s with %s',
    (index, value, options, validationErrors) => {
      class Sample {
        @Validation({ ...options, type: 'boolean' })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      console.log(errors);

      if (validationErrors.length === 0) {
        expect(errors.length).toEqual(0);
      } else {
        expect(errors.length).greaterThan(0);

        const constraints = errors
          .map((e) => Object.keys(e.constraints || {}))
          .flat();
        for (const c of constraints) {
          expect(validationErrors).include(c);
        }
      }
    }
  );
});
