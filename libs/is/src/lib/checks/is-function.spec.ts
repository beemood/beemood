import { isFunction } from './is-function.js';

describe('isFunction: check the value is function or not ', () => {
  it.each`
    index | input         | output
    ${1}  | ${undefined}  | ${false}
    ${2}  | ${null}       | ${false}
    ${2}  | ${1}          | ${false}
    ${2}  | ${-1}         | ${false}
    ${2}  | ${0}          | ${false}
    ${2}  | ${{}}         | ${false}
    ${2}  | ${[]}         | ${false}
    ${2}  | ${class A {}} | ${false}
    ${2}  | ${String}     | ${false}
    ${2}  | ${Number}     | ${false}
    ${2}  | ${Boolean}    | ${false}
    ${2}  | ${BigInt}     | ${false}
    ${2}  | ${Object}     | ${false}
    ${2}  | ${() => ({})} | ${true}
  `('$index -> should $input return $output', ({ input, output }) => {
    expect(isFunction(input)).toEqual(output);
  });
});
