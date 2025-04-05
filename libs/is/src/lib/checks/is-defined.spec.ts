import { isDefined } from './is-defined.js';
describe('isDefined: check the value is defined or not', () => {
  it.each`
    index | input        | output
    ${1}  | ${undefined} | ${false}
    ${2}  | ${null}      | ${false}
    ${2}  | ${NaN}       | ${false}
    ${2}  | ${false}     | ${true}
    ${2}  | ${true}      | ${true}
    ${2}  | ${1}         | ${true}
    ${2}  | ${0}         | ${true}
    ${2}  | ${-1}        | ${true}
    ${2}  | ${{}}        | ${true}
    ${2}  | ${[]}        | ${true}
  `('$index -> should $input return $output', ({ input, output }) => {
    expect(isDefined(input)).toEqual(output);
  });
});
