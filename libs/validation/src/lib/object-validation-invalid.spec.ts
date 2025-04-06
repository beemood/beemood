import { ObjectOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import { Validation } from './wrap/validation.decorator.js';

describe('ObjectValidation | Invalid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [
    number,
    Sample,
    Omit<ObjectOptions, 'type' | 'target'>,
    string[]
  ];

  class Some {
    @Validation({ type: 'string' }) some: string;
  }

  const validTestData: TestData[] = [
    [1, { value: '1' }, {}, ['nestedValidation', 'isObject']],
    [2, { value: 1 }, {}, ['nestedValidation', 'isObject']],
    [3, { value: [] }, {}, ['isObject']],
    [4, { value: { some: 1 } }, {}, ['isString']],
  ];

  it.each(validTestData)(
    '%d | should not validate %s with %s',
    (index, value, options, validationErrors) => {
      class Sample {
        @Validation({ ...options, type: 'object', target: () => Some })
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
