export class EnumMatcher<F, R> {
  protected acc: (R | R[] | undefined)[] = [];

  constructor(protected readonly enumValue: string) {}

  isEqual<T extends F>(
    value: T,
    handler: () => R[] | R | undefined,
  ): EnumMatcher<Exclude<F, T>, R> {
    if (this.enumValue === value) {
      this.acc.push(handler());
    }

    return this as unknown as EnumMatcher<Exclude<F, T>, R>;
  }

  collect(): R[] {
    return this.acc.flat().filter((e) => e != undefined) as R[];
  }
}
