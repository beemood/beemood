import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { BufferMinLength } from './buffer-min-length.js';
describe('BufferMinLength', () => {
  describe('valid', () => {
    it.each`
      value                   | bufferMinLength
      ${[1, 2, 3]}            | ${3}
      ${[1, 2, 3, 4]}         | ${3}
      ${[1, 2, 3, 4, 5]}      | ${3}
      ${['1', '2', '3', '4']} | ${3}
    `(
      'BufferMinLength($bufferMinLength) fo $value',
      ({ value, bufferMinLength }) => {
        class Sample {
          @BufferMinLength(bufferMinLength)
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
      value        | bufferMinLength
      ${undefined} | ${3}
      ${null}      | ${3}
      ${[]}        | ${3}
      ${[1, 2]}    | ${3}
    `(
      'BufferMinLength($bufferMinLength) - > $expected ',
      ({ value, bufferMinLength }) => {
        class Sample {
          @BufferMinLength(bufferMinLength) value: Buffer;
        }
        const instance = plainToInstance(Sample, {
          value: value && Buffer.from(value),
        });
        const errors = validateSync(instance);

        expect(errors).toBeDefined();
        expect(errors).toHaveLength(1);
        expect(
          errors.find((e) => e.constraints?.bufferMinLength),
        ).toBeDefined();
      },
    );
  });
});
