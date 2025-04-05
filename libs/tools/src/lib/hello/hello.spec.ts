import { hello } from './hello.js';

describe('hello', () => {
  it('should hello', () => {
    const log = vi.spyOn(console, 'log');
    hello({ name: 'some' });
    expect(log).toHaveBeenCalledWith('Hello, some');
    log.mockRestore();
  });
});
