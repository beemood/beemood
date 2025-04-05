import type { AnyFunction, Optional } from '@bmod/types';

export function isFunction(
  value?: Optional<AnyFunction>
): value is AnyFunction {
  if (typeof value != 'function') {
    return false;
  }

  const rep = value.toString();

  if (
    rep.includes('class') ||
    rep.includes('function String') ||
    rep.includes('function Number') ||
    rep.includes('function Boolean') ||
    rep.includes('function BigInt') ||
    rep.includes('function Object')
  ) {
    return false;
  }

  return true;
}
