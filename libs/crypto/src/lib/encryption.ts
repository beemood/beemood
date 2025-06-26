import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { Readable } from 'stream';

/**
 * Crypto utility with truly asynchronous encryption and decryption using streams
 */
export class Encryption {
  /**
   * Algorithm
   */
  private static readonly ALGORITHM = 'aes-256-cbc';

  /**
   * Key length
   */
  private static readonly KEY_LENGTH = 32; // 256 bits

  /**
   * Iv length
   */
  private static readonly IV_LENGTH = 16; // 128 bits for CBC

  /**
   * Encoding
   */
  private static readonly ENCODING = 'hex';

  /**
   * Check the key has at 256 bits
   * @param key
   */
  protected static validateKey(key: Buffer | undefined | null) {
    if (key?.length !== this.KEY_LENGTH) {
      throw new Error(`Key must be ${this.KEY_LENGTH} bytes`);
    }
  }

  /**
   * Encrypts data using AES-256-CBC asynchronously with streams
   * @param data String to encrypt
   * @param key Encryption key (32 bytes/256 bits)
   * @returns Promise resolving to encrypted string (IV:encrypted_data in hex)
   * @throws Error if key length is invalid
   */
  static async encrypt(
    data: string,
    key: Buffer,
    version: number,
  ): Promise<string> {
    this.validateKey(key);
    const iv = randomBytes(this.IV_LENGTH);
    const cipher = createCipheriv(this.ALGORITHM, key, iv);

    return new Promise((resolve, reject) => {
      let encrypted = '';
      const input = Readable.from([data]); // Create stream from string

      input
        .pipe(cipher)
        .on('data', (chunk) => (encrypted += chunk.toString(this.ENCODING)))
        .on('end', () =>
          resolve(
            `${version.toString()}:${iv.toString(this.ENCODING)}:${encrypted}`,
          ),
        )
        .on('error', reject);
    });
  }

  /**
   * Decrypt data encrypted with AES-256-CBC asynchronously with streams
   * @param encryptedData Encrypted string (IV:encrypted_data)
   * @param key Original encryption key (32 bytes/256 bits)
   * @returns Promise resolving to decrypted string
   * @throws Error if key length is invalid or decryption fails
   */
  static async decrypt(encryptedData: string, key: Buffer): Promise<string> {
    this.validateKey(key);

    const [__version, __iv, __encrypted] = encryptedData.split(':');

    if (!__version || !__iv || !__encrypted) {
      throw new Error('Invalid encrypted data format');
    }

    const iv = Buffer.from(__iv, this.ENCODING);
    const decipher = createDecipheriv(this.ALGORITHM, key, iv);
    const input = Readable.from([Buffer.from(__encrypted, this.ENCODING)]);

    return new Promise((resolve, reject) => {
      let decrypted = '';
      input
        .pipe(decipher)
        .on('data', (chunk) => (decrypted += chunk.toString('utf8')))
        .on('end', () => {
          return resolve(decrypted);
        })
        .on('error', reject);
    });
  }

  /**
   * Generates a random 256-bit key
   * @returns Buffer containing a secure random key
   */
  static generateKey(): Buffer {
    return randomBytes(this.KEY_LENGTH);
  }

  /**
   * Get key from environment variables
   * @param version
   * @returns
   */
  static getKeyFromEnv(version: string) {
    return process.env[`ENCRYPTION_KEY_${version}`];
  }
}
