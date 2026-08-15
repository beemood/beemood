import { randomUUID } from 'crypto';
import 'reflect-metadata';
import { PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('String validation', () => {
  describe('Valid string input', () => {
    it.each`
      options                        | value
      ${undefined}                   | ${{ value: null }}
      ${undefined}                   | ${{ value: undefined }}
      ${undefined}                   | ${{ value: 'some' }}
      ${{ required: true } as O}     | ${{ value: 's' }}
      ${{ minLength: 1 } as O}       | ${{ value: 's' }}
      ${{ maxLength: 1 } as O}       | ${{ value: 's' }}
      ${{ enum: ['s', 'v'] } as O}   | ${{ value: 's' }}
      ${{ format: 'email' } as O}    | ${{ value: 'some@email.com' }}
      ${{ format: 'uuid' } as O}     | ${{ value: randomUUID() }}
      ${{ format: 'password' } as O} | ${{ value: '?SomePassword12.' }}
    `(`$value | $options`, ({ options, value }) => {
      class Sample {
        @PropValidation(options) value: string;
      }

      const { errors, instance } = transformAndValidate(Sample, value);

      expect(instance).toEqual(value);
      expect(errors).toEqual([]);
    });
  });

  describe('Invalid string input', () => {
    it.each`
      options                         | value              | exp
      ${{ minLength: 3 } as O}        | ${{ value: '12' }} | ${['minLength']}
      ${{ maxLength: 1 } as O}        | ${{ value: '12' }} | ${['maxLength']}
      ${{ enum: ['s', 'v'] } as O}    | ${{ value: 'd' }}  | ${['isEnum']}
      ${{ format: 'email' } as O}     | ${{ value: '12' }} | ${['isEmail']}
      ${{ format: 'uuid' } as O}      | ${{ value: '12' }} | ${['isUuid']}
      ${{ format: 'uri' } as O}       | ${{ value: '12' }} | ${['isUrl']}
      ${{ format: 'ean' } as O}       | ${{ value: '12' }} | ${['isEAN']}
      ${{ format: 'password' } as O}  | ${{ value: '12' }} | ${['isStrongPassword']}
      ${{ format: 'date' } as O}      | ${{ value: '12' }} | ${['isDateString']}
      ${{ format: 'date-time' } as O} | ${{ value: '12' }} | ${['isDateString']}
      ${{ format: 'time' } as O}      | ${{ value: '12' }} | ${['isDateString']}
    `(`$value | $options`, ({ options, value, exp }) => {
      class Sample {
        @PropValidation(options) value: string;
      }

      const { errors, instance } = transformAndValidate(Sample, value);

      expect(instance).toEqual(value);
      expect(exp.length).toEqual(errors.length);

      const constraints = errors.flatMap((e) =>
        Object.keys(e.constraints ?? {}),
      );
      for (const constraint of constraints) {
        expect(exp).include(constraint);
      }
    });
  });
});
