import { trim } from './trim.js';

describe('trim: replace empty space with single empty space and trim the string', () => {
  describe('Valid cases', () => {
    it.each`
      value                   | expected
      ${''}                   | ${''}
      ${' '}                  | ${''}
      ${' some   '}           | ${'some'}
      ${' some    other    '} | ${'some other'}
    `('trim($value) should return  $expected', ({ value, expected }) => {
      expect(trim(value)).toEqual(expected);
    });
  });

  describe('Invalid cases', () => {
    it.each`
      value
      ${undefined}
      ${null}
      ${1}
      ${true}
      ${{}}
      ${[]}
    `('trim($value) should throw error ', ({ value }) => {
      expect(() => trim(value)).toThrowError();
    });
  });
});
