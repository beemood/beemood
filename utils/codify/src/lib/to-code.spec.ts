import { toCode } from './to-code.js';

describe('toCode', () => {
  it.each`
    value               | expected
    ${''}               | ${'""'}
    ${true}             | ${'true'}
    ${false}            | ${'false'}
    ${{ name: 'some' }} | ${'{\n  name: "some"\n}'}
    ${class A {}}       | ${'A'}
  `('should to-code $value into $expected', ({ value, expected }) => {
    expect(toCode(value)).toEqual(expected);
  });
});
