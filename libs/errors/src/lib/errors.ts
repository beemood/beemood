export class BaseCustomError extends Error {
  public readonly code: string;

  constructor(code: string, message?: string) {
    super(message ?? code);
    this.name = this.constructor.name;
    this.code = code;
    // Restores proper prototype chain in V8 environments
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export enum ErrorPrefix {
  AccessDenied = 'AccessDenied',
  EmptyArray = 'EmptyArray',
  EmptyString = 'EmptyString',
  InvalidIdentifier = 'InvalidIdentifier',
  InvalidInput = 'InvalidInput',
  InvalidJson = 'InvalidJson',
  MaxLength = 'MaxLength',
  MinLength = 'MinLength',
  NotSupported = 'NotSupported',
  Null = 'Null',
  Pattern = 'Pattern',
  Required = 'Required',
  Undefined = 'Undefined',
  NotAllowed = 'NotAllowed',
  NotImplemented = 'NotImplemented',
  UnkownType = 'UnkownType',
}

type ErrorClassName<T extends string> = `${T}Error`;

/**
 * Dynamically constructs error class constructors based on string prefixes.
 */
export function createErrorClasses<T extends readonly string[]>(
  prefixes: T,
): {
  [K in T[number] as ErrorClassName<K>]: new (
    message?: string,
  ) => BaseCustomError;
} {
  const errorMap = {} as Record<
    string,
    new (message?: string) => BaseCustomError
  >;

  for (const prefix of prefixes) {
    const className = `${prefix}Error`;

    // Create a named class dynamically using object shorthand
    const DynamicClass = {
      [className]: class extends BaseCustomError {
        constructor(message?: string) {
          super(prefix, message);
        }
      },
    }[className];

    if (DynamicClass) {
      errorMap[className] = DynamicClass;
    } else {
      throw new Error(`DynamicClass is not defined`);
    }
  }

  return errorMap as any;
}

// Instantiate the classes map
export const Errors = createErrorClasses(
  Object.keys(ErrorPrefix) as ErrorPrefix[],
);

export const {
  AccessDeniedError,
  EmptyArrayError,
  EmptyStringError,
  InvalidIdentifierError,
  InvalidInputError,
  InvalidJsonError,
  MaxLengthError,
  MinLengthError,
  NotAllowedError,
  NotImplementedError,
  NotSupportedError,
  NullError,
  PatternError,
  RequiredError,
  UndefinedError,
  UnkownTypeError,
} = Errors;
