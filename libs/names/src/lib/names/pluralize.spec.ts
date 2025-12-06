import { pluralize } from './pluralize.js';

describe('pluralize', () => {
  describe('basic', () => {
    it.each`
      name      | plural
      ${'name'} | ${'names'}
    `('pluralize($name) should return $plural', ({ name, plural }) => {
      expect(pluralize(name)).toEqual(plural);
    });
  });
});
