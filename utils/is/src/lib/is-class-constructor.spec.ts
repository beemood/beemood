import { boxedTypes } from './box-types.js';
import { isBoxedTypeConstructor, isClassConstructor } from './is.js';

describe('isClassConstructor', () => {
  it('should check boxedtypes', () => {
    for (const b of boxedTypes) {
      expect(isBoxedTypeConstructor(b)).toEqual(true);
    }
  });
  describe('valid class constructor', () => {
    it.each`
      fn
      ${class A {}}
      ${class _B {}}
      ${class $A {}}
      ${class $A extends class C {} {}}
    `('isClassConstructor($fn) should return true ', ({ fn }) => {
      expect(isClassConstructor(fn)).toEqual(true);
    });
  });

  describe('invalid class constructor', () => {
    it.each`
      fn
      ${undefined}
      ${null}
      ${1}
      ${'text'}
    `('isClassConstructor($fn) should return false ', ({ fn }) => {
      expect(isClassConstructor(fn)).toEqual(false);
    });

    it('isClassConstructor(boxedType) should return false ', () => {
      for (const b of boxedTypes) {
        expect(isClassConstructor(b)).toEqual(false);
      }
    });
  });
});
