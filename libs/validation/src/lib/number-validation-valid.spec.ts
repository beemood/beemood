import { NumberOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('NumberValidation | Valid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<NumberOptions, 'type'>];

  enum Some {
    Some = 1,
  }

  const validTestData: TestData[] = [
    [1, { value: 1 }, { minimum: 1 }],
    [1, { value: 1 }, { maximum: 1 }],
    [1, { value: 1 }, { enum: Some }],
    [1, { value: 1 }, { isIn: [1] }],
    [1, { value: 1 }, { isNotIn: [2] }],
    [1, { value: 1 }, { notEqual: 2 }],
    [1, { value: '1' }, { transform: true }],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options) => {
      class Sample {
        @Validation({ ...options, type: 'number' })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      if (errors.length > 0) console.log(errors);
      expect(errors.length).toEqual(0);
    }
  );
});
