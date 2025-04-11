import { generateTOTP, verifyTOTP } from './totp.js';

describe('totp', () => {
  it('should verify totp', { timeout: 60000 }, (done) => {
    const o = generateTOTP('abcd', 30);
    expect(verifyTOTP('abcd', o)).toEqual(true);
    expect(verifyTOTP('abcd', 975231 + '')).toEqual(false);
  });
});
