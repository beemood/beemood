import { ParameterIsRequired } from '@beemood/error';
import type { Optional } from '@beemood/interface';

export function requiredValue<T>(value: Optional<T>): value is T {
  if (value == undefined) {
    throw new ParameterIsRequired();
  }

  return true;
}
