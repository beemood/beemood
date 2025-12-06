import { slugify } from './slugify.js';

describe('slugify', () => {
  describe('valid cases', () => {
    it.each`
      name                 | result
      ${'some'}            | ${'some'}
      ${'some-some'}       | ${'some-some'}
      ${'Food & Clothing'} | ${'food-clothing'}
    `('slugify($name) should return $result', ({ name, result }) => {
      expect(slugify(name)).toEqual(result);
    });
  });
});
