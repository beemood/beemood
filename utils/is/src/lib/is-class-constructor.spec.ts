import { isClassConstructor, isFunction } from './is.js';

describe('isFunction', () => {
  it('should check the value is a type of object', () => {
    expect(isFunction(() => ({}))).toBeTruthy();
    expect(
      isFunction(function some() {
        return 1;
      }),
    ).toBeTruthy();

    class Sample {
      method() {
        return 1;
      }
    }

    expect(isFunction(Sample.prototype.method)).toBeTruthy();
  });
});

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

describe('isObject', () => {
  it('should check the value is a type of object', () => {
    expect({} instanceof Object).toBeTruthy();
  });
});
