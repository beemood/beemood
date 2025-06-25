import type { CommonError } from '@beemood/interface';
import type { ErrorCodes } from './error-codes.js';

export class BaseError extends Error implements CommonError {
  constructor(
    message: string,
    public readonly code: ErrorCodes,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
