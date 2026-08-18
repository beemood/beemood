import 'reflect-metadata';
import { type PropValidationOptions as O } from './prop-validation-options.js';
import { PropValidation } from './prop-validation.js';
import { transformAndValidate } from './transform-and-validate.js';

describe('Array string invalid input', () => {
  it.each`
    options                                                            | value                          | exp
    ${{ type: () => String, isArray: true } as O}                      | ${{ value: undefined }}        | ${[]}
    ${{ type: () => String, isArray: true } as O}                      | ${{ value: [] }}               | ${[]}
    ${{ type: () => String, isArray: true, minLength: 1 } as O}        | ${{ value: [''] }}             | ${['nestedValidation', 'minLength']}
    ${{ type: () => String, isArray: true, maxLength: 1 } as O}        | ${{ value: ['12'] }}           | ${['nestedValidation', 'maxLength']}
    ${{ type: () => String, isArray: true, format: 'email' } as O}     | ${{ value: ['invalid'] }}      | ${['nestedValidation', 'isEmail']}
    ${{ type: () => String, isArray: true, format: 'uuid' } as O}      | ${{ value: ['invalid'] }}      | ${['nestedValidation', 'isUuid']}
    ${{ type: () => String, isArray: true, format: 'password' } as O}  | ${{ value: ['invalid'] }}      | ${['nestedValidation', 'isStrongPassword']}
    ${{ type: () => String, isArray: true, format: 'date' } as O}      | ${{ value: ['invalid date'] }} | ${['nestedValidation', 'isDateString']}
    ${{ type: () => String, isArray: true, format: 'date-time' } as O} | ${{ value: ['invalid date'] }} | ${['nestedValidation', 'isDateString']}
    ${{ type: () => String, isArray: true, format: 'time' } as O}      | ${{ value: ['invalid date'] }} | ${['nestedValidation', 'isDateString']}
  `(`$value | $options`, ({ options, value, exp }) => {
    class Sample {
      @PropValidation(options) value: string[];
    }

    const { errors, instance } = transformAndValidate(Sample, value);

    expect(instance).toEqual(value);
    expect(exp.length).toEqual(errors.length);
    const constraints = errors.flatMap((e) => Object.keys(e.constraints ?? {}));
    for (const constraint of constraints) {
      expect(exp).include(constraint);
    }
  });
});
