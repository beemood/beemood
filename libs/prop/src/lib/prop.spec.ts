import 'reflect-metadata';
//
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Prop, PropOptions } from './prop.js';

function __validate<T extends Object>(
  classType: ClassConstructor<T>,
  value: T,
  errorCount: number,
  callback?: (errors: any) => void,
) {
  const instance = plainToInstance(classType, value);
  const errors = validateSync(instance);

  if (callback) callback(errors);
  expect(errors).toHaveLength(errorCount);
}

function _v(options: PropOptions): PropOptions {
  return options;
}

describe('Prop', () => {
  describe('common', () => {
    describe('valid', () => {
      it.each`
        value
        ${'valid string'}
      `(
        'should validate $value with { required: true } option',
        ({ value }) => {
          class Sample {
            @Prop({ required: true }) value: string;
          }
          __validate(Sample, { value }, 0);
        },
      );
    });

    describe('invalid', () => {
      it.each`
        value
        ${null}
        ${undefined}
      `('should NOT validate $value with $options', ({ value }) => {
        class Sample {
          @Prop({ required: true }) value: string;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });

  describe('string', () => {
    describe('valid', () => {
      it.each`
        options                            | value
        ${_v({ maxLength: 3 })}            | ${'123'}
        ${_v({ minLength: 3 })}            | ${'123'}
        ${_v({ stringFormat: 'email' })}   | ${'some@gmail.com'}
        ${_v({ stringFormat: 'uuid' })}    | ${'cc2d4a79-8df6-476a-83a6-bef539b8a120'}
        ${_v({ stringFormat: 'uuid4' })}   | ${'cc2d4a79-8df6-476a-83a6-bef539b8a120'}
        ${_v({ stringFormat: 'uuid7' })}   | ${'019fe2f0-2b9c-73cc-81c8-66da3824820b'}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toISOString()}
      `('should validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string;
        }
        __validate(Sample, { value }, 0);
      });
    });
    describe('invalid', () => {
      it.each`
        options                            | value
        ${_v({})}                          | ${0}
        ${_v({})}                          | ${-1}
        ${_v({})}                          | ${true}
        ${_v({})}                          | ${{}}
        ${_v({})}                          | ${[]}
        ${_v({ maxLength: 3 })}            | ${'some'}
        ${_v({ minLength: 3 })}            | ${'so'}
        ${_v({ stringFormat: 'email' })}   | ${'some'}
        ${_v({ stringFormat: 'uuid' })}    | ${'some'}
        ${_v({ stringFormat: 'uuid4' })}   | ${'some'}
        ${_v({ stringFormat: 'uuid7' })}   | ${'some'}
        ${_v({ stringFormat: 'iso8601' })} | ${'some'}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toString()}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toDateString()}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toLocaleDateString()}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toLocaleString()}
        ${_v({ stringFormat: 'iso8601' })} | ${new Date().toLocaleTimeString()}
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
      `('should validate $value with $options', ({ options, value }) => {
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

  describe('boolean', () => {
    describe('valid', () => {
      it.each`
        options   | value
        ${_v({})} | ${true}
        ${_v({})} | ${false}
        ${_v({})} | ${'false'}
        ${_v({})} | ${'true'}
      `('should validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: boolean;
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options   | value
        ${_v({})} | ${'some'}
        ${_v({})} | ${{}}
        ${_v({})} | ${1}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: boolean;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });

  describe('date', () => {
    describe('valid', () => {
      it.each`
        options   | value
        ${_v({})} | ${new Date()}
      `('should validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: Date;
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options   | value
        ${_v({})} | ${'some'}
        ${_v({})} | ${{}}
        ${_v({})} | ${1}
        ${_v({})} | ${new Date().toLocaleDateString()}
        ${_v({})} | ${new Date().toISOString()}
        ${_v({})} | ${new Date().toISOString()}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: Date;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });

  describe('object', () => {
    describe('valid', () => {
      it.each`
        options   | value
        ${_v({})} | ${{}}
      `('should validate $value with $options', ({ options, value }) => {
        class SubObj {
          @Prop() value: string;
        }
        class Sample {
          @Prop({ ...options, type: () => SubObj }) value: SubObj;
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options   | value
        ${_v({})} | ${'some'}
        ${_v({})} | ${true}
        ${_v({})} | ${1}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class SubObj {
          @Prop() value: string;
        }
        class Sample {
          @Prop({ ...options, type: () => SubObj }) value: SubObj;
        }
        __validate(Sample, { value }, 1);
      });
    });
  });

  //
  //
  //
  //
  describe('array-string', () => {
    describe('valid', () => {
      it.each`
        options                       | value
        ${_v({ type: () => String })} | ${[]}
        ${_v({ type: () => String })} | ${['some']}
      `('should validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string[];
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options                       | value
        ${_v({ type: () => String })} | ${'some'}
        ${_v({ type: () => String })} | ${[1]}
        ${_v({ type: () => String })} | ${[true]}
        ${_v({ type: () => String })} | ${[{}]}
        ${_v({ type: () => String })} | ${{}}
        ${_v({ type: () => String })} | ${1}
        ${_v({ type: () => String })} | ${true}
        ${_v({ type: () => String })} | ${false}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: string[];
        }
        __validate(Sample, { value }, 1, (errors) => console.log(errors));
      });
    });
  });

  //
  //
  //
  //
  describe('array-number', () => {
    describe('valid', () => {
      it.each`
        options                       | value
        ${_v({ type: () => Number })} | ${[]}
        ${_v({ type: () => Number })} | ${[1]}
        ${_v({ type: () => Number })} | ${[-1]}
        ${_v({ type: () => Number })} | ${[0]}
      `('should validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: number[];
        }
        __validate(Sample, { value }, 0);
      });
    });

    describe('invalid', () => {
      it.each`
        options                       | value
        ${_v({ type: () => Number })} | ${0}
        ${_v({ type: () => Number })} | ${-1}
        ${_v({ type: () => Number })} | ${1}
        ${_v({ type: () => Number })} | ${'some'}
        ${_v({ type: () => Number })} | ${['some']}
        ${_v({ type: () => Number })} | ${[true]}
        ${_v({ type: () => Number })} | ${[{}]}
        ${_v({ type: () => Number })} | ${{}}
        ${_v({ type: () => Number })} | ${1}
        ${_v({ type: () => Number })} | ${true}
        ${_v({ type: () => Number })} | ${false}
      `('should NOT validate $value with $options', ({ options, value }) => {
        class Sample {
          @Prop(options) value: number[];
        }
        __validate(Sample, { value }, 1);
      });
    });
  });
});
