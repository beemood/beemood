import { isArrowFunction } from './is.js';

describe('isArrowFunction', () => {
  describe('valid arrow function', () => {
    it.each`
      fn
      ${() => void 0}
      ${() => 1}
      ${(some: { name: string }) => some}
      ${(...args: unknown[]) => args}
      ${(foo: number) => foo}
      ${(foo: number, bar: number) => [foo, bar]}
    `('isArrowFunction($fn) should return true', ({ fn }) => {
      expect(isArrowFunction(fn)).toEqual(true);
    });
  });

  describe('invalid arrow function', () => {
    it.each([
      { fn: undefined },
      { fn: null },
      {
        fn: function () {
          return void 0;
        },
      },
      {
        fn: function some() {
          return void 0;
        },
      },
      { fn: String },
      { fn: Number },
      { fn: Function },
      { fn: Object },
    ])('isArrowFunction($fn) should return true', ({ fn }) => {
      expect(isArrowFunction(fn)).toEqual(false);
    });
  });
});
