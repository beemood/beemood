/**
 * Create the instance of {@link target} with {@link value}
 *
 * @param target
 * @param value
 * @returns
 */
export function toInstance<T extends { new (...args: unknown[]): any }>(
  target: T,
  value: { [P in keyof InstanceType<T>]: InstanceType<T>[P] },
): InstanceType<T> {
  const instance = new target(value);

  const ownKeys = new Set(Object.keys(instance));
  Object.assign(instance, value);
  const assignedKeys = new Set(Object.keys(instance));
  assignedKeys.forEach((k) => {
    if (!ownKeys.has(k)) delete instance[k];

    if (instance[k] === undefined) {
      delete instance[k];
    }
  });

  return instance;
}
