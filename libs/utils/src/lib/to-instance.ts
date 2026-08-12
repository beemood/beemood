import { Any, ObjectType } from '@beemood/types';

export function toInstance(target: ObjectType, value: Any) {
  const instance = new target(value);
  const ownKeys = new Set(Object.keys(instance));
  Object.assign(instance, value);
  const assignedKeys = new Set(Object.keys(instance));
  assignedKeys.forEach((k) => ownKeys.has(k) || delete (instance as Any)[k]);
  return instance;
}
