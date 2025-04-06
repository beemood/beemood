import { ArrayOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import { inspect } from 'util';
import { Validation } from './wrap/validation.decorator.js';

describe('ArrayValidation | Valid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<ArrayOptions, 'type' | 'items'>];

  const validTestData: TestData[] = [
    [1, { value: [] }, {}],
    [2, { value: [''] }, {}],
    [3, { value: ['some', ''] }, {}],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options) => {
      class Sample {
        @Validation({ type: 'array', items: { type: 'string' } })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      if (errors.length > 0) console.log(inspect(errors, { depth: 10 }));
      expect(errors.length).toEqual(0);
    }
  );
});
