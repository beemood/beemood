import type { StringPropertyOptions as O } from '@bmod/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import 'reflect-metadata';
import { Model } from './model.js';
import { Prop } from './property.js';

describe('StringProperty', () => {
  describe('Valid string property', () => {
    it.each`
      options                                    | value                                 | transformed
      ${{ type: 'string' } as O}                 | ${{}}                                 | ${{}}
      ${{ type: 'string' } as O}                 | ${{ value: '' }}                      | ${{ value: '' }}
      ${{ type: 'string', required: true } as O} | ${{ value: 'some' }}                  | ${{ value: 'some' }}
      ${{ type: 'string', minLength: 3 } as O}   | ${{ value: '123' }}                   | ${{ value: '123' }}
      ${{ type: 'string', maxLength: 5 } as O}   | ${{ value: '12345' }}                 | ${{ value: '12345' }}
      ${{ type: 'string', maxLength: 5 } as O}   | ${{ value: '12345' }}                 | ${{ value: '12345' }}
      ${{ type: 'string', trim: true } as O}     | ${{ value: '    some    value    ' }} | ${{ value: 'some value' }}
    `(
      'should validate $value with $options and return $transformed',
      ({ options, value, transformed }) => {
        @Model()
        class Sample {
          @Prop(options) value: string;
        }

        const instance = plainToInstance(Sample, value);
        const errors = validateSync(instance);

        expect(instance).toEqual(transformed);
        expect(errors.length).toEqual(0);
      }
    );
  });

  describe('Invalid string property', () => {
    it.each`
      options                                                | value                  | expectedErrors
      ${{ type: 'string', required: true } as O}             | ${{}}                  | ${['isNotEmpty', 'isString']}
      ${{ type: 'string', required: true } as O}             | ${{ value: '' }}       | ${['isNotEmpty']}
      ${{ type: 'string', minLength: 3, maxLength: 5 } as O} | ${{ value: 'so' }}     | ${['minLength']}
      ${{ type: 'string', minLength: 3, maxLength: 5 } as O} | ${{ value: 'somess' }} | ${['maxLength']}
    `(
      'should NOT validate $value with $options and return $transformed',
      ({ options, value, expectedErrors }) => {
        @Model()
        class Sample {
          @Prop(options) value: string;
        }

        const instance = plainToInstance(Sample, value);
        const errors = validateSync(instance);

        const constraints = errors
          .map((e) => Object.keys(e.constraints || {}))
          .flat();

        expect(constraints).toEqual(expectedErrors);
      }
    );
  });
});
