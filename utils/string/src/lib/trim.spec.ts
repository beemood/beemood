import { trim } from './trim.js';

describe('trim', () => {
  it('should trim string', () => {
    expect(trim('some')).toEqual('some');
    expect(trim('some   ')).toEqual('some');
    expect(trim('  some   ')).toEqual('some');
    expect(trim('  \n \t \b some \n \t            other  \t \t  ')).toEqual(
      'some other',
    );
  });
});
