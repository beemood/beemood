import { PropertyOptions as O } from '@beemood/interface';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './validation.js';

describe('ArrayValidation', () => {
  describe('Valid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{} as O}
      ${null}      | ${{} as O}
      ${[]}        | ${{} as O}
      ${['some']}  | ${{} as O}
    `(
      'should validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'array', items: { type: 'string' } })
          value: string[];
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
    `(
      'should NOT validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'array', items: { type: 'string' } })
          value: string[];
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors.length).toBeGreaterThan(0);
      }
    );
  });
});
