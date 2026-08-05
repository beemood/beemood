import { toSnakeCase } from './to-snake-case.js';

describe('toSnakeCase', () => {
  it.each`
    value               | expected
    ${'a'}              | ${'a'}
    ${'some'}           | ${'some'}
    ${'some-other'}     | ${'some_other'}
    ${'someOther'}      | ${'some_other'}
    ${'SomeOther'}      | ${'some_other'}
    ${'Some     Other'} | ${'some_other'}
  `('toSnakeCase($value) - > $expected', ({ value, expected }) => {
    expect(toSnakeCase(value)).toEqual(expected);
  });
});
