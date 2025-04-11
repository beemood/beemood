/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable spellcheck/spell-checker */

import crypto from 'crypto';

export function generateTOTP(
  secretKeyBase32: string,
  timeStep = 30,
  digits = 6
) {
  try {
    // Decode Base32 secret key
    const key = base32Decode(secretKeyBase32.toUpperCase());

    // Get current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Calculate time counter
    const timeCounter = Math.floor(currentTime / timeStep);

    // Pack the time counter into 8 bytes (big-endian)
    const timeBytes = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
      timeBytes[7 - i] = (timeCounter >>> (i * 8)) & 0xff;
    }

    // Generate HMAC-SHA1 hash
    const hmac = crypto.createHmac('sha1', Buffer.from(key as any) as any);
    hmac.update(timeBytes as any);
    const hmacHash = hmac.digest();

    // Dynamic truncation
    const offset = hmacHash[hmacHash.length - 1] & 0x0f;
    const truncatedHash = hmacHash.slice(offset, offset + 4);

    // Convert to integer (big-endian)
    const otpInt = truncatedHash.readUInt32BE(0) & 0x7fffffff; // Mask out the most significant bit

    // Format as OTP with leading zeros
    const otp = (otpInt % Math.pow(10, digits))
      .toString()
      .padStart(digits, '0');

    return otp;
  } catch (error) {
    console.error('Error generating TOTP:', error);
    return '';
  }
}

/**
 * Base32 decoding function [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#autoid-11)
 * @param encoded
 * @returns
 */
export function base32Decode(encoded: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  encoded = encoded.replace(/=+$/, () => {
    return '';
  });
  let bits = 0;
  let value = 0;
  const output = [];
  for (let i = 0; i < encoded.length; i++) {
    const char = encoded[i].toUpperCase();
    const index = alphabet.indexOf(char);
    if (index === -1) {
      throw new Error('Invalid Base32 character');
    }
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      output.push((value >>> (bits - 8)) & 0xff);
      bits -= 8;
    }
  }
  return Buffer.from(output);
}

export function verifyTOTP(
  secretKeyBase32: string,
  providedOTP: string,
  timeStep = 30,
  digits = 6,
  window = 1
) {
  try {
    // Check OTP for the current time step
    const currentOTP = generateTOTP(secretKeyBase32, timeStep, digits);
    if (currentOTP === providedOTP) {
      return true;
    }

    // Check OTP for the previous time step (window - 1)
    for (let i = 1; i <= window; i++) {
      const previousOTP = generateTOTP(secretKeyBase32, timeStep, digits);
      if (previousOTP === providedOTP) {
        return true;
      }
    }

    // Check OTP for the next time step (window - 1)
    for (let i = 1; i <= window; i++) {
      const nextOTP = generateTOTP(secretKeyBase32, timeStep, digits);
      if (nextOTP === providedOTP) {
        return true;
      }
    }

    return false; // OTP is not valid for the current or nearby time steps
  } catch (error) {
    console.error('Error verifying TOTP:', error);
    return false;
  }
}

export function generateBase32Secret(length = 16) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % alphabet.length;
    secret += alphabet[randomIndex];
  }

  return secret;
}

export class Otp {
  static generate() {
    const secret = generateBase32Secret();

    const otp = generateTOTP(secret);
    return { secret, otp };
  }

  static verify(otp: string) {
    const [secret, otpValue] = otp.split('::');
    return verifyTOTP(secret, otpValue);
  }
}
