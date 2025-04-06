import { IntegerOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('IntegerValidation | Invalid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<IntegerOptions, 'type'>, string[]];

  enum Some {
    Some = 2,
  }

  const validTestData: TestData[] = [
    [1, { value: '1' }, {}, ['isInt']],
    [1, { value: 1.4 }, {}, ['isInt']],
    [2, { value: true }, {}, ['isInt']],
    [3, { value: {} }, {}, ['isInt']],
    [4, { value: [] }, {}, ['isInt']],
    [5, { value: () => ({}) }, {}, ['isInt']],
    [6, { value: null }, { required: true }, ['isInt', 'isNotEmpty']],
    [7, { value: undefined }, { required: true }, ['isInt', 'isNotEmpty']],
    [8, { value: 0 }, { minimum: 1 }, ['min']],
    [9, { value: 2 }, { maximum: 1 }, ['max']],

    [10, { value: 2 }, { isIn: [1] }, ['isIn']],
    [11, { value: 1 }, { isNotIn: [1] }, ['isNotIn']],
    [12, { value: 1 }, { notEqual: 1 }, ['notEquals']],
    [13, { value: 1 }, { enum: Some }, ['isEnum']],
  ];

  it.each(validTestData)(
    '%d | should not validate %s with %s',
    (index, value, options, validationErrors) => {
      class Sample {
        @Validation({ ...options, type: 'integer' })
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
