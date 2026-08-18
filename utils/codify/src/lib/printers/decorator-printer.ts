import { type Printer } from './printer.js';

export type DecoratorPrinterOptions = {
  name: string;
  options?: string;
  padding?: number;
};

export class DecoratorPrinter implements Printer {
  constructor(protected readonly options: DecoratorPrinterOptions) {}

  protected printPadding() {
    this.options.padding ??= 0;
    if (this.options.padding > 0) {
      return ' '.repeat(this.options.padding);
    }

    return '';
  }
  protected printName() {
    return this.options.name;
  }

  protected printAtSign() {
    return '@';
  }

  protected printOptions() {
    return `${this.options.options ?? ''}`;
  }

  print(): string {
    return `${this.printPadding()}${this.printAtSign()}${this.printName()}(${this.printOptions()})`;
  }
}
