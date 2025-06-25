import { PropertyOptions as O } from '@beemood/interface';
import { Exclude, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Validation } from './validation.js';

describe('StringValidation', () => {
  describe('Valid cases', () => {
    it.each`
      value                | options
      ${undefined}         | ${{} as O}
      ${null}              | ${{} as O}
      ${''}                | ${{} as O}
      ${' '}               | ${{} as O}
      ${'some'}            | ${{} as O}
      ${' some '}          | ${{} as O}
      ${'some'}            | ${{ minLength: 4 } as O}
      ${'some'}            | ${{ maxLength: 4 } as O}
      ${'email@email.com'} | ${{ stringFormat: 'email' } as O}
      ${'!Password123.'}   | ${{ stringFormat: 'password' } as O}
      ${'+18889884242'}    | ${{ stringFormat: 'phone' } as O}
    `(
      'should validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'string' })
          value: string;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors).toEqual([]);
      }
    );
  });

  describe('Invalid cases', () => {
    it.each`
      value            | options
      ${undefined}     | ${{ required: true } as O}
      ${null}          | ${{ required: true } as O}
      ${''}            | ${{ minLength: 1 } as O}
      ${'some'}        | ${{ maxLength: 3 } as O}
      ${'email@email'} | ${{ stringFormat: 'email' } as O}
      ${'pass'}        | ${{ stringFormat: 'password' } as O}
      ${'phone'}       | ${{ stringFormat: 'phone' } as O}
      ${'some'}        | ${{ stringFormat: 'uuid4' } as O}
      ${'some'}        | ${{ stringFormat: 'barcode' } as O}
    `(
      'should NOT validate value="$value" with options=$options',
      ({ value, options }) => {
        @Exclude()
        class Sample {
          @Validation({ ...options, type: 'string' })
          value: string;
        }
        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors.length).toBeGreaterThan(0);
      }
    );
  });
});
