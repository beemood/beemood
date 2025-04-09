import { UniqueArray } from './unique-array.js';

describe('UniqueArray', () => {
  it('should create unique array', () => {
    const d = new UniqueArray<'a' | 'b'>();

    d.set('a').set('b');

    expect(d.length).toEqual(2);
    expect(d[0]).toEqual('a');
    expect(d[1]).toEqual('b');
  });
});
