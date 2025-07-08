import { normalize } from './normalize.js';
describe('normalize', () => {
  it.each`
    value           | result
    ${'some'}       | ${'some'}
    ${'Some'}       | ${'some'}
    ${'some-value'} | ${'some-value'}
    ${'SomeValue'}  | ${'some-value'}
    ${'someValue'}  | ${'some-value'}
    ${'some value'} | ${'some-value'}
    ${'some_value'} | ${'some-value'}
    ${'SOME_VALUE'} | ${'some-value'}
    ${'SOME VALUE'} | ${'some-value'}
  `('should transform $value to $result', ({ value, result }) => {
    expect(normalize(value)).toEqual(result);
  });
});
