import { toKebabCase } from './to-kebab-case.js';

describe('toKebabCase', () => {
  it.each`
    value               | expected
    ${'a'}              | ${'a'}
    ${'some'}           | ${'some'}
    ${'some-other'}     | ${'some-other'}
    ${'someOther'}      | ${'some-other'}
    ${'SomeOther'}      | ${'some-other'}
    ${'Some     Other'} | ${'some-other'}
  `('toKebabCase($value) - > $expected', ({ value, expected }) => {
    expect(toKebabCase(value)).toEqual(expected);
  });
});
