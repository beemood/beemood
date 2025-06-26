import { Encryption } from './encryption.js';

describe('Encryption', () => {
  let version = 1;
  it('should encrypt', async () => {
    const data = 'some data';
    const secretKey = Encryption.generateKey();
    const encryptedData = await Encryption.encrypt(data, secretKey, version);
    const decryptedData = await Encryption.decrypt(encryptedData, secretKey);
    expect(decryptedData).toEqual(data);
  });
});
