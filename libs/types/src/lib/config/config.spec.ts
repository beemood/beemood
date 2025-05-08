import { Config } from './config.js';
describe('Config', () => {
  it('should return the correct value', () => {
    expect(Config.APP_NAME).toEqual('APP_NAME');
    expect(Config.APP_DESCRIPTION).toEqual('APP_DESCRIPTION');
    expect(Config.PORT).toEqual('PORT');
    expect(Config.GLOBAL_PREFIX).toEqual('GLOBAL_PREFIX');
    expect(Config.JWT_SECRET).toEqual('JWT_SECRET');
  });
});
