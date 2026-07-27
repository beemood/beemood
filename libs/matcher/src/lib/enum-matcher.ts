export class EnumMatcher<F, R> {
  protected acc?: R;
  constructor(protected readonly enumValue: string) {}

  isEqual<T extends F>(
    value: T,
    handler: () => R | undefined,
  ): EnumMatcher<Exclude<F, T>, R> {
    if (this.acc == undefined) {
      if (this.enumValue === value) {
        this.acc = handler();
      }
    }
    return this as unknown as EnumMatcher<Exclude<F, T>, R>;
  }

  collect(): R | undefined {
    return this.acc;
  }
}
