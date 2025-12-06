import { trim } from './trim.js';

describe('trim', () => {
  describe('valid cases', () => {
    it.each`
      name                         | result
      ${'   some    text        '} | ${'some text'}
    `('trim(name) should return result', ({ name, result }) => {
      expect(trim(name)).toEqual(result);
    });
  });
});
