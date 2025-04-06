import { ObjectOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import { Validation } from './wrap/validation.decorator.js';

describe('ObjectValidation | Valid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<ObjectOptions, 'type' | 'target'>];

  class Some {
    @Validation({ type: 'string' }) some: string;
  }

  const validTestData: TestData[] = [
    [1, { value: {} }, {}],
    [2, { value: { some: undefined } }, {}],
    [3, { value: { some: null } }, {}],
    [4, { value: { some: '' } }, {}],
    [5, { value: { some: 'some' } }, {}],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options) => {
      class Sample {
        @Validation({ ...options, type: 'object', target: () => Some })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      if (errors.length > 0) console.log(errors);
      expect(errors.length).toEqual(0);
    }
  );
});
