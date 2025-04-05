import { isUndefined } from './is-undefined.js';
describe('isUndefined: check the value is undefined or not', () => {
  it.each`
    index | input        | output
    ${1}  | ${undefined} | ${true}
    ${2}  | ${null}      | ${true}
    ${2}  | ${NaN}       | ${false}
    ${2}  | ${false}     | ${false}
    ${2}  | ${true}      | ${false}
    ${2}  | ${1}         | ${false}
    ${2}  | ${0}         | ${false}
    ${2}  | ${-1}        | ${false}
    ${2}  | ${{}}        | ${false}
    ${2}  | ${[]}        | ${false}
  `('$index -> should $input return $output', ({ input, output }) => {
    expect(isUndefined(input)).toEqual(output);
  });
});
