import 'reflect-metadata';
import { type PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Array Valid', () => {
  it.each`
    options                                                                 | value
    ${{ type: () => Object, isArray: true } as O}                           | ${{ value: [] }}
    ${{ type: () => Object, isArray: true } as O}                           | ${{ value: [] }}
    ${{ type: () => Object, isArray: true, minItems: 1, maxItems: 1 } as O} | ${{ value: [{ name: 'some' }] }}
  `('$options | $value', ({ options, value }) => {
    class SubSample {
      @PropValidation() name: string;
    }

    class Sample {
      @PropValidation({ ...options, type: () => SubSample }) value: SubSample[];
    }

    const { errors, instance } = transformAndValidate(Sample, value);

    expect(JSON.parse(JSON.stringify(instance))).toEqual(value);
    expect(errors).toEqual([]);
  });
});
