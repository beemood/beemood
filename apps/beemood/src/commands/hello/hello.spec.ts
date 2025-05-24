import { helloHandler } from './hello.js';

describe('helloHandler', () => {
  it('should say hello', () => {
    expect(helloHandler([], { name: 'some' })).toEqual('Hello, some');
  });
});
