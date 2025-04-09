export class UniqueArray<T extends string> extends Array {
  set<V extends T>(value: V): UniqueArray<Exclude<T, V>> {
    this.push(value);
    return this as unknown as UniqueArray<Exclude<T, V>>;
  }
}
