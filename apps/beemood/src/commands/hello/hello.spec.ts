import { helloHandler } from './hello.js';

describe('helloHandler', () => {
  it('should say hello', () => {
    helloHandler([], { name: 'some' });
  });
});
