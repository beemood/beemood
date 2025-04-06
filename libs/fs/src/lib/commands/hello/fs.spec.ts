import { fs } from './fs.js';

describe('fs', () => {
  it('should fs', () => {
    const log = vi.spyOn(console, 'log');
    fs({ name: 'some' });
    expect(log).toHaveBeenCalledWith('Fs, some');
    log.mockRestore();
  });
});
