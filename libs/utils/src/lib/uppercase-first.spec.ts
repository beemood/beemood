import { uppercaseFirst } from './uppercase-first.js';

describe('uppercaseFirst', () => {
  it.each`
    value     | expected
    ${'some'} | ${'Some'}
  `('uppercaseFirst($value) - > $expected', ({ value, expected }) => {
    expect(uppercaseFirst(value)).toEqual(expected);
  });
});
