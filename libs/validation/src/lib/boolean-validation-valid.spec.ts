import { BooleanOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('BooleanValidation | Valid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<BooleanOptions, 'type'>];

  const validTestData: TestData[] = [
    [1, { value: true }, {}],
    [2, { value: false }, {}],
    [3, { value: 'true' }, { transform: true }],
    [4, { value: 'false' }, { transform: true }],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options) => {
      class Sample {
        @Validation({ ...options, type: 'boolean' })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      if (errors.length > 0) console.log(errors);
      expect(errors.length).toEqual(0);
    }
  );
});
