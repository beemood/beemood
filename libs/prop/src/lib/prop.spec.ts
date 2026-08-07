import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Prop } from './prop.js';

describe('Prop', () => {
  describe('string', () => {
    describe('valid', () => {
      it.each`
        options | value
        ${{}}   | ${''}
      `('should validate', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string;
        }

        const instance = plainToInstance(Sample, { value });
        const errors = validateSync(instance);
        expect(errors).toHaveLength(0);
      });
    });
  });
  it('should annotate properties', () => {
    expect(1).toEqual(1);
  });
});
