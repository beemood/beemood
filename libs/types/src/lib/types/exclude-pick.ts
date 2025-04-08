export type ExcludePick<T extends object, V extends object> = Pick<
  T,
  Exclude<keyof T, keyof V>
>;
