import { PropertyOptions as O } from '@beemood/interface';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './validation.js';

describe('BooleanValidation', () => {
  describe('Valid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{} as O}
      ${null}      | ${{} as O}
      ${true}      | ${{} as O}
      ${false}     | ${{} as O}
    `(
      'should validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'boolean' })
          value: boolean;
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
      ${'1'}       | ${{ required: true } as O}
      ${1}         | ${{ required: true } as O}
      ${{}}        | ${{ required: true } as O}
    `(
      'should NOT validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'boolean' })
          value: boolean;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors.length).toBeGreaterThan(0);
      }
    );
  });
});
