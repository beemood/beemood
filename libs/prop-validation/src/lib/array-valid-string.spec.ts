import 'reflect-metadata';

import { randomUUID } from 'node:crypto';
import { type PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Array valid string', () => {
  it.each`
    options                                                            | value
    ${{ type: () => String, isArray: true, required: true } as O}      | ${{ value: ['s'] }}
    ${{ type: () => String, isArray: true } as O}                      | ${{ value: ['some'] }}
    ${{ type: () => String, isArray: true, minLength: 1 } as O}        | ${{ value: ['s'] }}
    ${{ type: () => String, isArray: true, maxLength: 1 } as O}        | ${{ value: ['s'] }}
    ${{ type: () => String, isArray: true, format: 'email' } as O}     | ${{ value: ['some@email.com'] }}
    ${{ type: () => String, isArray: true, format: 'uuid' } as O}      | ${{ value: [randomUUID()] }}
    ${{ type: () => String, isArray: true, format: 'password' } as O}  | ${{ value: ['?SomePassword12.'] }}
    ${{ type: () => String, isArray: true, format: 'date' } as O}      | ${{ value: [new Date().toISOString()] }}
    ${{ type: () => String, isArray: true, format: 'date-time' } as O} | ${{ value: [new Date().toISOString()] }}
    ${{ type: () => String, isArray: true, format: 'time' } as O}      | ${{ value: [new Date().toISOString()] }}
  `(`$value | $options`, ({ options, value }) => {
    class Sample {
      @PropValidation(options) value: string[];
    }

    const { errors, instance } = transformAndValidate(Sample, value);

    expect(instance).toEqual(value);
    expect(errors).toEqual([]);
  });
});
