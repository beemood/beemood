import { PropertyOptions as O } from '@beemood/interface';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import "reflect-metadata";
import { Validation } from './validation.js';


describe('ObjectValidation', () => {
  describe('Valid cases', () => {
    it.each`
      value        | options
      ${undefined} | ${{} as O}
      ${null}      | ${{} as O}
    `(
      'should validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class SubSample {
          @Validation({ type: 'string' })
          value: string;
        }
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'object', target: () => SubSample })
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
    `(
      'should NOT validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class SubSample {
          @Validation({ type: 'string' })
          value: string;
        }
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'object', target: () => SubSample })
          value: number;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors.length).toBeGreaterThan(0);
      }
    );
  });
});
