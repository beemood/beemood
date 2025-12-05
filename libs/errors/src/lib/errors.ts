/**
 * Throw when the string, array, or object is empty
 */
export class EmptyError extends Error {
  constructor(message: string) {
    super("EmptyError: " + message);
    Object.setPrototypeOf(this, EmptyError);
  }
}

/**
 * Throw when something already exist
 */
export class ExistError extends Error {
  constructor(message: string) {
    super("ExistError: " + message);
    Object.setPrototypeOf(this, ExistError);
  }
}

/**
 * Throw when the parameter is not allowed
 */
export class ForbiddenParamError extends Error {
  constructor(message: string) {
    super("ForbiddenParamError: " + message);
    Object.setPrototypeOf(this, ForbiddenParamError);
  }
}

/**
 * Throw when the name is invalid in the cotext
 */
export class InvalidNameError extends Error {
  constructor(message: string) {
    super("InvalidNameError: " + message);
    Object.setPrototypeOf(this, InvalidNameError);
  }
}

/**
 * Throw when the user pass invalid parameters
 */
export class InvalidParamError extends Error {
  constructor(message: string) {
    super("InvalidParamError: " + message);
    Object.setPrototypeOf(this, InvalidParamError);
  }
}

/**
 * Throw when the given number is greater than expected
 */
export class MaxError extends Error {
  constructor(message: string) {
    super("MaxError: " + message);
    Object.setPrototypeOf(this, MaxError);
  }
}

/**
 * Throw when the given string is longer than expected
 */
export class MaxLengthError extends Error {
  constructor(message: string) {
    super("MaxLengthError: " + message);
    Object.setPrototypeOf(this, MaxLengthError);
  }
}

/**
 * Throw when the given number is less than expected
 */
export class MinError extends Error {
  constructor(message: string) {
    super("MinError: " + message);
    Object.setPrototypeOf(this, MinError);
  }
}

/**
 * Throw when the given string is shorter than expected
 */
export class MinLengthError extends Error {
  constructor(message: string) {
    super("MinLengthError: " + message);
    Object.setPrototypeOf(this, MinLengthError);
  }
}

/**
 * Throw when the operation is not allowed
 */
export class NotAllowedError extends Error {
  constructor(message: string) {
    super("NotAllowedError: " + message);
    Object.setPrototypeOf(this, NotAllowedError);
  }
}

/**
 * Throw when something is not found
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super("NotFoundError: " + message);
    Object.setPrototypeOf(this, NotFoundError);
  }
}

/**
 * Throw when the number is out of range
 */
export class RangeError extends Error {
  constructor(message: string) {
    super("RangeError: " + message);
    Object.setPrototypeOf(this, RangeError);
  }
}

/**
 * Throw when the required parameters is not provided
 */
export class RequiredError extends Error {
  constructor(message: string) {
    super("RequiredError: " + message);
    Object.setPrototypeOf(this, RequiredError);
  }
}
