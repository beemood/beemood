import { omit } from './omit.js';

describe('omit', () => {
  it('should omit', () => {
    expect(omit({ foo: 'foo', bar: 'bar' }, ['foo'])).toEqual({ bar: 'bar' });
  });
});
