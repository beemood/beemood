import type { ValueHandler } from '@bmod/types';

export class SwitchCase<T> {
  constructor(protected readonly value: T) {}

  def<CT extends T, R extends SwitchCase<Exclude<T, CT>>>(
    value: CT,
    handler: ValueHandler<T, void>
  ): R {
    if (value === this.value) handler(value);

    return this as unknown as R;
  }
}

export function switchCase<T>(value: T): SwitchCase<T> {
  return new SwitchCase(value);
}
