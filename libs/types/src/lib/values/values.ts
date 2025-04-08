import type { Optional } from '../condition/optional.js';

export function DateValue(value?: Date): Optional<Date> {
  return value;
}

export function StringValue<T extends string>(value?: T): Optional<T> {
  return value;
}

export function NumberValue<T extends number>(value?: T): Optional<T> {
  return value;
}

export function BooleanValue(value?: boolean): Optional<boolean> {
  return value;
}

export function ArrayValue<T>(value?: Array<T>): Optional<Array<T>> {
  return value;
}

export function ObjectValue<T extends object>(value?: T): Optional<T> {
  return value;
}

export function RequiredDateValue(value?: Date): Date {
  return value ?? new Date();
}

export function RequiredStringValue<T extends string>(value?: T): T {
  return value ?? (String() as T);
}

export function RequiredNumberValue<T extends number>(value?: T): T {
  return value ?? (Number() as T);
}

export function RequiredBooleanValue(value?: boolean): boolean {
  return value ?? Boolean();
}

export function RequiredArrayValue<T>(value?: Array<T>): Array<T> {
  return value ?? Array<T>();
}

export function RequiredObjectValue<T extends object>(value?: T): T {
  return value ?? ({} as T);
}
