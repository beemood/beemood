import { StringOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('StringValidation | Valid Cases', () => {
  type Sample = { value?: string | null; other?: string | null };
  type TestData = [number, Sample, Omit<StringOptions, 'type'>];

  enum Some {
    Some = 'some',
  }

  const validTestData: TestData[] = [
    [1, { value: undefined }, {}],
    [2, { value: null }, {}],
    [3, { value: '' }, {}],
    [4, { value: 'some' }, {}],
    [5, { value: 'some' }, { minLength: 4 }],
    [6, { value: 'some' }, { maxLength: 4 }],
    [7, { value: 'some' }, { isIn: ['some'] }],
    [8, { value: 'some' }, { isNotIn: ['other'] }],
    [9, { value: 'some' }, { contains: 'so' }],
    [10, { value: 'some' }, { contains: 'me' }],
    [11, { value: 'some' }, { contains: 'some' }],
    [12, { value: 'some' }, { notEqual: 'other' }],
    [13, { value: 'some' }, { startsWith: 'so' }],
    [14, { value: 'some' }, { notStartsWith: 'me' }],
    [15, { value: 'some' }, { endsWith: 'me' }],
    [16, { value: 'some' }, { notEndsWith: 'so' }],
    [
      17,
      { value: 'some' },
      {
        enum: Some,
      },
    ],
    [18, { value: 'some' }, { notContains: 'ot' }],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options) => {
      console.log(value, options);
      class Sample {
        @Validation({ ...options, type: 'string' })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);
      if (errors.length > 0) {
        console.log(errors);
      }
      expect(errors.length).toEqual(0);
    }
  );
});
