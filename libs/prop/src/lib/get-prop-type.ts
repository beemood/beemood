import {
  PropertyDecoratorPropertyKey,
  PropertyDecoratorTarget,
} from '@beemood/types';
import 'reflect-metadata';

/**
 * Get "design:type" from reflection
 * @param target
 * @param propertyKey
 * @returns
 */
export function getPropType(
  target: PropertyDecoratorTarget,
  propertyKey: PropertyDecoratorPropertyKey,
): typeof Object {
  return Reflect.getMetadata('design:type', target, propertyKey);
}
