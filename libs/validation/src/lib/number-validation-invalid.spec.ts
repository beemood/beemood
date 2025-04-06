import { NumberOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('NumberValidation | Invalid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<NumberOptions, 'type'>, string[]];

  enum Some {
    Some = 2,
  }

  const validTestData: TestData[] = [
    [1, { value: '1' }, {}, ['isNumber']],
    [2, { value: true }, {}, ['isNumber']],
    [3, { value: {} }, {}, ['isNumber']],
    [4, { value: [] }, {}, ['isNumber']],
    [5, { value: () => ({}) }, {}, ['isNumber']],
    [6, { value: null }, { required: true }, ['isNumber', 'isNotEmpty']],
    [7, { value: undefined }, { required: true }, ['isNumber', 'isNotEmpty']],
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
        @Validation({ ...options, type: 'number' })
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
