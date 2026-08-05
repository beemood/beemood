import { toPascalCase } from './to-pascal-case.js';

describe('toPascalCase', () => {
  it.each`
    value               | expected
    ${'a'}              | ${'A'}
    ${'some'}           | ${'Some'}
    ${'some-other'}     | ${'SomeOther'}
    ${'someOther'}      | ${'SomeOther'}
    ${'SomeOther'}      | ${'SomeOther'}
    ${'Some     Other'} | ${'SomeOther'}
  `('toPascalCase($value) - > $expected', ({ value, expected }) => {
    expect(toPascalCase(value)).toEqual(expected);
  });
});
