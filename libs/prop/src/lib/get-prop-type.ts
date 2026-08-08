import {
  PropertyDecoratorPropertyKey,
  PropertyDecoratorTarget,
} from '@beemood/types';

/**
 * Get "design:type" from reflection
 * @param target
 * @param propertyKey
 * @returns
 */
export function getPropType(
  target: PropertyDecoratorTarget,
  propertyKey: PropertyDecoratorPropertyKey,
) {
  return Reflect.getMetadata('design:type', target, propertyKey);
}
