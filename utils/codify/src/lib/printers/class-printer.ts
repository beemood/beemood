import { type ClassConstructor } from '@beemood/types';
import { type Printer } from './printer.js';

export type ClassPrinterOptions<PP extends ClassConstructor<Printer>> = {
  name: string;
  propertyPrinter: PP;
  properties?: ConstructorParameters<PP>;
  extends?: string;
};

export class ClassPrinter<PP extends ClassConstructor<Printer>>
  implements Printer
{
  constructor(protected readonly options: ClassPrinterOptions<PP>) {
    this.options.extends ??= '';
  }

  protected printProperties() {
    return this.options.properties
      ?.map(
        (propertyOptions) => new this.options.propertyPrinter(propertyOptions),
      )
      .map((e) => e.print())
      .join('\n');
  }

  print(): string {
    return [
      `export class ${this.options.name}${this.options.extends} {`,
      this.printProperties(),
      `}`,
    ].join('\n');
  }
}
