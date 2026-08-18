export class PropertyMatcher<O extends Record<string, any>, R> {
  protected readonly acc: (R[] | R | undefined)[] = [];

  constructor(protected readonly record: O) {}

  isTrue<K extends keyof O>(
    key: K,
    ...handlers: ((value: Exclude<O[K], undefined | null>) => R | undefined)[]
  ): PropertyMatcher<Omit<O, K>, R> {
    const value = this.record[key];
    if (value === true) {
      this.acc.push(...handlers.map((e) => e(value)));
    }
    return this;
  }

  isEqual<K extends keyof O>(
    key: K,
    expectedValue: O[K],
    ...handlers: ((value: Exclude<O[K], undefined | null>) => R)[]
  ): PropertyMatcher<Omit<O, K>, R> {
    const value = this.record[key];
    if (value === expectedValue) {
      this.acc.push(...handlers.map((e) => e(value)));
    }
    return this;
  }

  isNotEqual<K extends keyof O>(
    key: K,
    expectedValue: O[K],
    ...handlers: ((value: Exclude<O[K], undefined | null>) => R)[]
  ): PropertyMatcher<Omit<O, K>, R> {
    const value = this.record[key];
    if (value !== expectedValue) {
      this.acc.push(...handlers.map((e) => e(value)));
    }
    return this;
  }

  isDefined<K extends keyof O>(
    key: K,
    ...handlers: ((
      value: Exclude<O[K], undefined | null>,
    ) => R[] | R | undefined)[]
  ): PropertyMatcher<Omit<O, K>, R> {
    const value = this.record[key];
    if (value !== undefined) {
      this.acc.push(...handlers.map((e) => e(value)));
    }
    return this;
  }

  collect() {
    return this.acc.flat().filter((e) => e !== undefined);
  }
}
