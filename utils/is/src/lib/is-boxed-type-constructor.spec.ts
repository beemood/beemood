import { boxedTypes } from './box-types.js';
import { isBoxedTypeConstructor } from './is.js';

describe('isBoxedTypeConstructor', () => {
  it('should check the value is a boxed type constructor or not', () => {
    for (const b of boxedTypes) {
      expect(isBoxedTypeConstructor(b)).toEqual(true);
    }

    expect(isBoxedTypeConstructor('')).toEqual(false);
    expect(isBoxedTypeConstructor(1)).toEqual(false);
    expect(isBoxedTypeConstructor({})).toEqual(false);
    expect(isBoxedTypeConstructor(class Sample {})).toEqual(false);
    expect(isBoxedTypeConstructor(Array)).toEqual(true);
  });
});
