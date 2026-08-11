import 'reflect-metadata';
//
import {
  ObjectType,
  PropertyDecoratorPropertyKey,
  PropertyDecoratorTarget,
} from '@beemood/types';
//

/**
 * Get "design:type" from reflection
 * @param target
 * @param propertyKey
 * @returns
 */
export function getPropType(
  target: PropertyDecoratorTarget,
  propertyKey: PropertyDecoratorPropertyKey,
): ObjectType {
  return Reflect.getMetadata('design:type', target, propertyKey);
}
