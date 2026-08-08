import 'reflect-metadata';
//
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Prop, PropOptions } from './prop.js';

function __validate<T extends Object>(
  classType: ClassConstructor<T>,
  value: T,
  errorCount: number,
) {
  const instance = plainToInstance(classType, value);
  const errors = validateSync(instance);
  expect(errors).toHaveLength(errorCount);
}

function _v(options: PropOptions): PropOptions {
  return options;
}
describe('Prop', () => {
  describe('string', () => {
    describe('valid', () => {
      it.each`
        options                          | value
        ${_v({ maxLength: 3 })}          | ${'123'}
        ${_v({ minLength: 3 })}          | ${'123'}
        ${_v({ stringFormat: 'email' })} | ${'some@gmail.com'}
        ${_v({ stringFormat: 'uuid' })}  | ${'cc2d4a79-8df6-476a-83a6-bef539b8a120'}
        ${_v({ stringFormat: 'uuid4' })} | ${'cc2d4a79-8df6-476a-83a6-bef539b8a120'}
        ${_v({ stringFormat: 'uuid7' })} | ${'019fe2f0-2b9c-73cc-81c8-66da3824820b'}
      `('should validate', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string;
        }
        __validate(Sample, { value }, 0);
      });
    });
    describe('invalid', () => {
      it.each`
        options                          | value
        ${_v({})}                        | ${0}
        ${_v({})}                        | ${-1}
        ${_v({})}                        | ${true}
        ${_v({})}                        | ${{}}
        ${_v({})}                        | ${[]}
        ${_v({ maxLength: 3 })}          | ${'some'}
        ${_v({ minLength: 3 })}          | ${'so'}
        ${_v({ stringFormat: 'email' })} | ${'some'}
        ${_v({ stringFormat: 'uuid' })}  | ${'some'}
        ${_v({ stringFormat: 'uuid4' })} | ${'some'}
        ${_v({ stringFormat: 'uuid7' })} | ${'some'}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });

  describe('number', () => {
    describe('valid', () => {
      it.each`
        options                        | value
        ${_v({ maximum: 1 })}          | ${1}
        ${_v({ maximum: 1 })}          | ${0}
        ${_v({ minimum: 1 })}          | ${1}
        ${_v({ minimum: 1 })}          | ${2}
        ${_v({ numberFormat: 'int' })} | ${2}
        ${_v({ numberFormat: 'int' })} | ${-1}
      `('should validate', ({ options, value }) => {
        class Sample {
          @Prop(options) value: number;
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options                        | value
        ${_v({})}                      | ${'some'}
        ${_v({})}                      | ${true}
        ${_v({})}                      | ${{}}
        ${_v({})}                      | ${[]}
        ${_v({ minimum: 3 })}          | ${2}
        ${_v({ maximum: 3 })}          | ${4}
        ${_v({ numberFormat: 'int' })} | ${4.5}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: number;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });
});
