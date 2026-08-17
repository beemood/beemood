import { toNormalCase } from './to-normal-case.js';

describe('toNormalCase', () => {
  it.each`
    value                               | expected
    ${'a'}                              | ${'a'}
    ${' a '}                            | ${'a'}
    ${'some'}                           | ${'some'}
    ${'some        '}                   | ${'some'}
    ${'     some        '}              | ${'some'}
    ${'     some        other        '} | ${'some other'}
    ${'     some        other        '} | ${'some other'}
  `('toNormalCase($value) - > $expected', ({ value, expected }) => {
    expect(toNormalCase(value)).toEqual(expected);
  });
});
