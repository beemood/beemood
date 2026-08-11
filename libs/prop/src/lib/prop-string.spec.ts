import { PropOptions } from '@beemood/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';
import { Prop } from './prop.js';
const p = (o: PropOptions) => o;
describe('Prop String', () => {
  describe('valid', () => {
    it.each`
      options                        | value
      ${p({ lessThan: 4 })}          | ${'123'}
      ${p({ moreThan: 2 })}          | ${'123'}
      ${p({ lessThanOrEqualTo: 3 })} | ${'123'}
      ${p({ moreThanOrEqualTo: 3 })} | ${'123'}
      ${p({ format: 'email' })}      | ${'some@gmail.com'}
      ${p({ format: 'uuid4' })}      | ${uuidv4()}
      ${p({ format: 'uuid7' })}      | ${uuidv7()}
      ${p({ format: 'date' })}       | ${'10-10-2026'}
      ${p({ format: 'time' })}       | ${'10:10 PM'}
      ${p({ format: 'password' })}   | ${'!Password123.'}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) value: string;
      }
      const instance = plainToInstance(
        Sample,
        { value },
        { excludeExtraneousValues: true },
      );
      const errors = validateSync(instance);

      console.log(errors);
      expect(errors.length).toEqual(0);
    });
  });
});
