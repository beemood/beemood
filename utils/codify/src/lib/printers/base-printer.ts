import { InvalidIdentifierError, NotImplementedError } from '@beemood/errors';
import { isDefined, isValidIdentifier } from '@beemood/is';
import { isNotEmptyString } from '@beemood/string';
import { type ClassConstructor } from '@beemood/types';

import { type Printer } from './printer.js';

export type BasePrinterOptions = {
  name: string;
  type?: string;
  decorator?: string;
  options?: string;
  comment?: string;
  readonly?: boolean;
  required?: boolean;
  padding?: number;
  isArray?: boolean;
  defaultValue?: string;
};

export abstract class BasePrinter<T extends BasePrinterOptions>
  implements Printer
{
  constructor(protected options: T) {}

  protected printPadding(): string {
    if (this.options.padding && this.options.padding > 0) {
      return ' '.repeat(this.options.padding);
    }
    return '';
  }

  protected printDecorator(): string {
    return this.options.decorator ?? '';
  }

  protected printComment(): string {
    if (
      isDefined(this.options.comment) &&
      isNotEmptyString(this.options.comment)
    ) {
      return `/** ${this.options.comment.replace(/\n/g, '\n* ')} */`;
    }
    return this.options.comment ?? '';
  }

  protected printDefaultValue(): string {
    return this.options.defaultValue !== undefined
      ? ` = ${this.options.defaultValue}`
      : '';
  }

  protected printType(): string {
    return this.options.type ?? 'unkown';
  }

  protected printName(): string {
    return this.options.name;
  }

  protected printOptions(): string {
    return this.options.options ?? '';
  }

  protected printAccessModifier(): '' | 'protected' | 'private' {
    return '';
  }

  protected printIsArray(): '' | '[]' {
    return this.options.isArray === true ? '[]' : '';
  }
  protected printRequired(): '' | '?' {
    return this.options.required === true ? '' : '?';
  }

  protected printReadonly(): '' | 'readonly' {
    return this.options.readonly === true ? 'readonly' : '';
  }

  protected printDefinition(): string {
    throw new NotImplementedError();
  }

  protected printEOL(): string {
    throw new NotImplementedError();
  }

  print(): string {
    throw new NotImplementedError();
  }
}

export type BasePropertyPrinterOptions = BasePrinterOptions;

export class BasePropertyPrinter<
  T extends BasePropertyPrinterOptions = BasePropertyPrinterOptions,
> extends BasePrinter<T> {
  constructor(options: T) {
    super(options);
    if (!isValidIdentifier(this.options.name)) {
      throw new InvalidIdentifierError(
        `"${this.options.name}" is not a valid indentifier`,
      );
    }
  }

  protected override printEOL(): string {
    return ';';
  }

  protected override printDefinition(): string {
    return `${this.printAccessModifier()}${this.printReadonly()}${this.printPadding()}${this.printName()}${this.printRequired()}: ${this.printType()}${this.printIsArray()}${this.printDefaultValue()}${this.printEOL()}`;
  }

  override print(): string {
    return [this.printComment(), this.printDecorator(), this.printDefinition()]
      .filter((e) => e)
      .join('\n');
  }
}

export type BaseClassPrinterOptions<P extends BasePrinterOptions> =
  BasePrinterOptions & {
    extending?: string;
    propertyPrinter: ClassConstructor<Printer>;
    propertyOptions?: P[];
  };

export class BaseClassPrinter<
  P extends BasePropertyPrinterOptions,
  T extends BaseClassPrinterOptions<P>,
> extends BasePrinter<T> {
  protected printExtends(): string {
    if (this.options.extending) {
      return ` extends ${this.options.extending} `;
    }

    return '';
  }

  protected printProperty(options: P) {
    return new this.options.propertyPrinter(options).print();
  }

  protected printProperties() {
    if (
      this.options.propertyOptions &&
      this.options.propertyOptions.length > 0
    ) {
      const propertiesContent = this.options.propertyOptions
        .map(this.printProperty)
        .join('\n');

      return [`{`, propertiesContent, `}`].join('\n');
    }

    return '';
  }

  protected override printDefinition(): string {
    return `export class ${this.printName()}${this.printExtends()}`;
  }

  override print(): string {
    return [
      this.printComment(),
      this.printDecorator(),
      this.printDefinition(),
      this.printProperties(),
    ]
      .filter(isNotEmptyString)
      .join('\n');
  }
}

export type BaseDecoratorPrinterOptions = Pick<
  BasePrinterOptions,
  'name' | 'options' | 'padding'
>;

export class BaseDecoratorPrinter<
  T extends BaseDecoratorPrinterOptions,
> extends BasePrinter<T> {
  protected printAtSign() {
    return '@';
  }
  override print(): string {
    return `${this.printPadding()}${this.printAtSign()}${this.printName()}(${this.printOptions()})`;
  }
}
