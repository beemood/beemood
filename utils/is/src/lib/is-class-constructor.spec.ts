import { isClassConstructor } from './is.js';

describe('isClassConstructor', () => {
  it('should check the value is a class type', () => {
    class RegularClass {}
    abstract class AbstractClass {}

    expect(isClassConstructor(RegularClass)).toBeTruthy();

    expect(
      isClassConstructor(function RegularClass() {
        return 1;
      }),
    ).toBeFalsy();

    expect(
      isClassConstructor(() => {
        return 1;
      }),
    ).toBeFalsy();

    expect(isClassConstructor(AbstractClass)).toBeTruthy();
  });
});
