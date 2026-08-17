import { uppercaseFirst } from './uppercase-first.js';

describe('uppercaseFirst', () => {
  it.each`
    value           | expected
    ${'some'}       | ${'Some'}
    ${'other'}      | ${'Other'}
    ${'some other'} | ${'Some other'}
  `('uppercaseFirst($value) - > $expected', ({ value, expected }) => {
    expect(uppercaseFirst(value)).toEqual(expected);
  });
});
