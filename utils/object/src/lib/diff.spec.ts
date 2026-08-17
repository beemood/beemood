import { diff } from './diff.js';

describe('diff', () => {
  it('should find the difference between 2 arrays', () => {
    expect(diff(['some', 'other'], ['first', 'second', 'some'])).toEqual([
      'other',
      'first',
      'second',
    ]);
  });
});
