import { ParameterIsRequired } from '@beemood/error';
import type { Optional } from '@beemood/interface';

/**
 * Check the value is defined or not and return the value or throw error accordingly
 * @param value optional value
 * @returns value {@link T}
 */
export function valueOrThrow<T>(value: Optional<T>): T {
  if (value == undefined) {
    throw new ParameterIsRequired();
  }

  return value;
}
