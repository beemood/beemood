import { ArrayOptions } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './wrap/validation.decorator.js';

describe('ArrayValidation | Invalid Cases', () => {
  type Sample = { value?: unknown | null; other?: string | null };
  type TestData = [
    number,
    Sample,
    Omit<ArrayOptions, 'type' | 'items'>,
    string[]
  ];

  const validTestData: TestData[] = [
    [1, { value: 1 }, {}, ['isArray', 'isString', 'isString']],
    [2, { value: 'some' }, {}, ['isArray']],
    [3, { value: {} }, {}, ['isArray', 'isString']],
    [4, { value: true }, {}, ['isArray', 'isString']],
    [5, { value: true }, {}, ['isArray', 'isString']],
  ];

  it.each(validTestData)(
    '%d | should validate %s with %s',
    (index, value, options, validationErrors) => {
      class Sample {
        @Validation({ type: 'array', items: { type: 'string' } })
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
