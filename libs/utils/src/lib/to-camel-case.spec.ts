import { toCamelCase } from './to-camel-case.js';

describe('toCamelCase', () => {
  it.each`
    value               | expected
    ${'a'}              | ${'a'}
    ${'some'}           | ${'some'}
    ${'some-other'}     | ${'someOther'}
    ${'someOther'}      | ${'someOther'}
    ${'SomeOther'}      | ${'someOther'}
    ${'Some     Other'} | ${'someOther'}
  `('toCamelCase($value) - > $expected', ({ value, expected }) => {
    expect(toCamelCase(value)).toEqual(expected);
  });
});
