import { ParameterIsRequired } from '@beemood/error';
import type { Optional } from '@beemood/interface';

export function valueOrThrow<T>(value: Optional<T>): T {
  if (value == undefined) {
    throw new ParameterIsRequired();
  }

  return value;
}
