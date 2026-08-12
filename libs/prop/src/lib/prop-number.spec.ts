import { PropOptions } from '@beemood/types';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Prop } from './prop.js';

const p = (o: PropOptions) => o;

describe('Prop Number', () => {
  describe('valid', () => {
    it.each`
      options                              | value
      ${p({ moreThanOrEqualTo: 3 })}       | ${3}
      ${p({ moreThanOrEqualTo: 3 })}       | ${4}
      ${p({ lessThanOrEqualTo: 3 })}       | ${3}
      ${p({ lessThanOrEqualTo: 3 })}       | ${2}
      ${p({ lessThan: 3 })}                | ${2}
      ${p({ moreThan: 3 })}                | ${4}
      ${p({ moreThan: 'other' })}          | ${11}
      ${p({ moreThanOrEqualTo: 'other' })} | ${10}
      ${p({ moreThanOrEqualTo: 'other' })} | ${11}
      ${p({ lessThan: 'other' })}          | ${9}
      ${p({ lessThanOrEqualTo: 'other' })} | ${9}
      ${p({ lessThanOrEqualTo: 'other' })} | ${10}
    `('should validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop() other: number;
        @Prop(options) value: number;
      }
      const instance = plainToInstance(
        Sample,
        { value, other: 10 },
        { excludeExtraneousValues: true },
      );
      const errors = validateSync(instance);

      expect(errors.length).toEqual(0);
    });
  });

  describe('invalid', () => {
    it.each`
      options                        | value
      ${p({ lessThan: 3 })}          | ${3}
      ${p({ moreThan: 3 })}          | ${3}
      ${p({ moreThanOrEqualTo: 3 })} | ${2}
      ${p({ lessThanOrEqualTo: 3 })} | ${4}
    `('should NOT validate $value with $options', ({ options, value }) => {
      class Sample {
        @Prop(options) value: number;
      }
      const instance = plainToInstance(
        Sample,
        { value },
        { excludeExtraneousValues: true },
      );
      const errors = validateSync(instance);

      expect(errors.length).toEqual(1);
    });
  });
});
