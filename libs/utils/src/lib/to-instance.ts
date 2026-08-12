import { Any, ObjectType } from '@beemood/types';

export function toInstance<T extends object>(
  target: ObjectType<T>,
  value: Any,
): T {
  const instance = new target(value);
  const ownKeys = new Set(Object.keys(instance));
  Object.assign(instance, value);
  const assignedKeys = new Set(Object.keys(instance));
  assignedKeys.forEach((k) => {
    if (!ownKeys.has(k)) delete (instance as Any)[k];

    if ((instance as any)[k] == undefined) {
      delete (instance as any)[k];
    }
  });

  return instance;
}
