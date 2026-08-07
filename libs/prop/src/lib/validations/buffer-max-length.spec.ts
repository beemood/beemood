import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BufferMaxLength } from './buffer-max-length.js';
describe('BufferMaxLength', () => {
  describe('valid', () => {
    it.each`
      value         | bufferMaxLength
      ${[1, 2, 3]}  | ${3}
      ${[1, 2]}     | ${3}
      ${['1', '2']} | ${3}
    `(
      'BufferMaxLength($bufferMaxLength) for $value',
      ({ value, bufferMaxLength }) => {
        class Sample {
          @BufferMaxLength(bufferMaxLength)
          value: Buffer;
        }
        const instance = plainToInstance(Sample, {
          value: value && Buffer.from(value),
        });
        const errors = validateSync(instance);

        expect(errors).toHaveLength(0);
      },
    );
  });

  describe('invalid', () => {
    it.each`
      value           | bufferMaxLength
      ${undefined}    | ${3}
      ${null}         | ${3}
      ${[1, 2, 3, 4]} | ${3}
    `(
      'BufferMaxLength($bufferMaxLength) - > $expected ',
      ({ value, bufferMaxLength }) => {
        class Sample {
          @BufferMaxLength(bufferMaxLength) value: Buffer;
        }
        const instance = plainToInstance(Sample, {
          value: value && Buffer.from(value),
        });
        const errors = validateSync(instance);

        expect(errors).toBeDefined();
        expect(errors).toHaveLength(1);
        expect(
          errors.find((e) => e.constraints?.bufferMaxLength),
        ).toBeDefined();
      },
    );
  });
});
