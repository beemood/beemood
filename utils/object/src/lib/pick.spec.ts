import { pick } from './pick.js';

describe('omit', () => {
  it('should omit', () => {
    expect(pick({ foo: 'foo', bar: 'bar' }, ['foo'])).toEqual({ foo: 'foo' });
  });
});
