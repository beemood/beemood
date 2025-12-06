import { InvalidNameError } from '@beemood/errors';
import { fail } from 'assert';
import { normalizeName } from './normalize-name.js';

describe('normalizeName', () => {
  describe('valid cases', () => {
    it.each`
      name              | result
      ${'some name'}    | ${'some name'}
      ${'some Name'}    | ${'some name'}
      ${'Some Name'}    | ${'some name'}
      ${'Some    Name'} | ${'some name'}
      ${'SomeName'}     | ${'some name'}
      ${'some_Name'}    | ${'some name'}
      ${'some-Name'}    | ${'some name'}
      ${'Some-Name'}    | ${'some name'}
    `('normalizeName($name) should return $result', ({ name, result }) => {
      expect(normalizeName(name)).toEqual(result);
    });
  });

  describe('invalid cases', () => {
    it.each`
      name
      ${''}
      ${'  '}
      ${'    '}
      ${'    s'}
      ${'s'}
    `('normalizeName($name) should throw $error', ({ name }) => {
      try {
        normalizeName(name);
        fail();
      } catch (err) {
        expect((err as any).name).toBe(InvalidNameError.name);
      }
    });
  });
});
