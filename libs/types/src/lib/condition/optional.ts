export type Optional<T = unknown> = T | undefined;
export type Nullable<T = unknown> = T | null;
export type OptionalObject<T extends object> = Partial<
  Record<keyof T, T[keyof T] | undefined>
>;
