import { StringOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('Invalid Cases | StringValidation ', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [number, Sample, Omit<StringOptions, 'type'>, string[]];

  enum Some {
    Some = 'some',
  }

  const validTestData: TestData[] = [
    [1, { value: 1 }, {}, ['isString']],
    [2, { value: true }, {}, ['isString']],
    [3, { value: {} }, {}, ['isString']],
    [4, { value: [] }, {}, ['isString']],
    [5, { value: () => ({}) }, {}, ['isString']],
    [6, { value: null }, { required: true }, ['isString', 'isNotEmpty']],
    [7, { value: undefined }, { required: true }, ['isString', 'isNotEmpty']],
    [9, { value: '' }, { minLength: 1 }, ['minLength']],
    [10, { value: 'fd' }, { maxLength: 1 }, ['maxLength']],
    [11, { value: 'f' }, { contains: 's' }, ['contains']],
    [12, { value: 'f' }, { notContains: 'f' }, ['notContains']],
    [13, { value: '' }, { isIn: ['some'] }, ['isIn']],
    [14, { value: 'some' }, { isNotIn: ['some'] }, ['isNotIn']],
    [15, { value: 'some' }, { notEqual: 'some' }, ['notEquals']],

    [16, { value: 'some' }, { startsWith: 'me' }, ['startsWith']],
    [17, { value: 'some' }, { notStartsWith: 'so' }, ['notStartsWith']],

    [18, { value: 'some' }, { endsWith: 'so' }, ['endsWith']],
    [19, { value: 'some' }, { notEndsWith: 'me' }, ['notEndsWith']],
    [20, { value: 'other' }, { enum: Some }, ['isEnum']],
  ];

  it.each(validTestData)(
    '%d | should not validate %s with %s',
    (index, value, options, validationErrors) => {
      console.log(value, options);
      class Sample {
        @Validation({ ...options, type: 'string' })
        value: string;
      }
      const instance = plainToInstance(Sample, value);
      const errors = validateSync(instance);

      if (validationErrors.length === 0) {
        if (errors.length > 0) {
          console.log(errors);
        }
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
