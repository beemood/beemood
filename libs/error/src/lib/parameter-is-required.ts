import { BaseError } from './base-error.js';
import { ErrorCodes } from './error-codes.js';

export class ParameterIsRequired extends BaseError {
  constructor(message = '', options?: ErrorOptions) {
    super(message, ErrorCodes.REQUIRED_PARAMETER, options);
  }
}
