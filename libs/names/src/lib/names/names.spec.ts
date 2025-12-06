import { InvalidNameError } from '@beemood/errors';
import { fail } from 'assert';
import { expect } from 'vitest';
import type { NameCases } from './names.js';
import { names } from './names.js';

describe('names', () => {
  describe('valid cases', () => {
    it.each`
      name | result
      ${'some_   _Name'} | ${{
  camel: 'someName',
  kebab: 'some-name',
  pascal: 'SomeName',
  screamingSnake: 'SOME_NAME',
  sentence: 'Some name',
  snake: 'some_name',
  title: 'Some Name',
} as NameCases}
    `('names(name) should return result', ({ name, result }) => {
      expect(JSON.stringify(names(name))).toEqual(JSON.stringify(result));
    });
  });

  describe('invalid cases', () => {
    it.each`
      name
      ${''}
      ${'.'}
      ${'?'}
      ${'  '}
      ${'s'}
      ${'s   '}
    `('names(name) should throw error', ({ name }) => {
      try {
        names(name);
        fail();
      } catch (err) {
        expect((err as any).name).toEqual(InvalidNameError.name);
      }
    });
  });
});
