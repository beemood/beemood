import { type ClassConstructor } from '@beemood/types';
import { type BasePropertyPrinterOptions } from './base-printer.js';
import { type Printer } from './printer.js';
import { type PropertyPrinter } from './property-printer.js';

export type ClassPrinterOptions = {
  name: string;
  propertyPrinter: ClassConstructor<PropertyPrinter>;
  properties?: BasePropertyPrinterOptions[];
  extends?: string;
};

export class ClassPrinter implements Printer {
  constructor(protected readonly options: ClassPrinterOptions) {
    this.options.extends ??= '';
    this.options.extends ??= '';
  }

  protected printProperties() {
    return this.options.properties
      ?.map(
        (propertyOptions) => new this.options.propertyPrinter(propertyOptions),
      )
      .map((e) => e.print());
  }

  print(): string {
    return [
      `export class ${this.options.name}${this.options.extends} {`,

      `}`,
    ].join('');
  }
}
