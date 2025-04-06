import { pms-db } from './pms-db.js';

describe('pms-db', () => {
  it('should pms-db', () => {
    const log = vi.spyOn(console, 'log');
    pms-db({ name: 'some' });
    expect(log).toHaveBeenCalledWith('PmsDb, some');
    log.mockRestore();
  });
});
