import { PropertyOptions as O } from '@beemood/interface';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './validation.js';

describe('IntegerValidation', () => {
  describe('Valid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{} as O}
      ${null}      | ${{} as O}
      ${-1}        | ${{} as O}
      ${0}         | ${{} as O}
      ${1}         | ${{} as O}
      ${3}         | ${{ maximum: 3 } as O}
      ${3}         | ${{ minimum: 3 } as O}
    `(
      'should validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'integer' })
          value: number;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors).toEqual([]);
      }
    );
  });

  describe('Invalid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{ required: true } as O}
      ${null}      | ${{ required: true } as O}
      ${0}         | ${{ minimum: 1 } as O}
      ${2}         | ${{ maximum: 1 } as O}
    `(
      'should NOT validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'number' })
          value: number;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors.length).toBeGreaterThan(0);
      }
    );
  });
});
