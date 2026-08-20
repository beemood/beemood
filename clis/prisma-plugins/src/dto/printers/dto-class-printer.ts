import {
  parsePropertyValidationOptions,
  toType,
  type Field,
  type Model,
} from '@beemood/prisma-helpers';
import { names } from '@beemood/utils';

export class DtoClassPrinter {
  constructor(protected model: Model) {}

  protected printClassDecorator(): string {
    return '@ObjectType()';
  }

  protected printClassNameSuffix(): string {
    return 'ReadDto';
  }

  protected printObjectPropertyNameSuffix() {
    return 'ReadDto';
  }

  protected printObjectPropertyFileNameSuffix() {
    return 'read';
  }

  protected printClassName(): string {
    return `${this.model.name}${this.printClassNameSuffix()}`;
  }

  protected printObjectPropertyType(field: Field) {
    return `${toType(field)}${this.printObjectPropertyNameSuffix()}`;
  }

  protected printScalarPropertyType(field: Field) {
    return `${toType(field)}`;
  }

  protected printEnumPropertyType(field: Field) {
    return `P.$Enums.${toType(field)}`;
  }

  protected printSingularPropertyType(field: Field): string {
    const __type = () => {
      switch (field.kind) {
        case 'object':
          return this.printObjectPropertyType(field);
        case 'scalar':
          return this.printScalarPropertyType(field);
        case 'enum':
          return this.printEnumPropertyType(field);
        case 'unsupported':
          return 'unkown';
      }
    };

    return __type();
  }

  protected printPropertyType(field: Field) {
    return `${this.printSingularPropertyType(field)}${field.isList ? '[]' : ''}`;
  }

  protected parsePropertyDecoratorOptions(field: Field): string {
    const options = { ...field };

    if (field.kind === 'object' || field.kind === 'enum') {
      options.type = this.printSingularPropertyType(field);
    }

    const validationOptions = parsePropertyValidationOptions(options);

    const __validationOptionsString = Object.entries(validationOptions)
      .reduce((acc, [k, v]) => {
        acc.push(`${k}: ${v}`);
        return acc;
      }, [] as string[])
      .join(',');

    const optionsString = __validationOptionsString
      ? `{${__validationOptionsString}}`
      : '';

    return optionsString;
  }
  protected printPropertyDecorator(field: Field): string {
    return `@Prop(${this.parsePropertyDecoratorOptions(field)})`;
  }

  protected mapField(field: Field): Field {
    return { ...field, isRequired: false };
  }
  protected isRequiredField(field: Field) {
    return !field;
  }

  protected requiredMark(field: Field) {
    return this.isRequiredField(field) ? '' : '?';
  }

  protected printProperty(field: Field): string {
    return `${field.name}${this.requiredMark(field)}:${this.printPropertyType(field)};`;
  }

  protected filterProperty(field: Field): boolean {
    return !!field;
  }

  protected printProperties(): string {
    return this.fields()
      .map((field) =>
        [this.printPropertyDecorator(field), this.printProperty(field)].join(
          ' ',
        ),
      )
      .join('\n');
  }

  protected printDefaultImport(name: string, filePath: string) {
    return `import ${name} from '${filePath}';`;
  }
  protected printImport(className: string, filePath: string) {
    return `import { ${className}  } from '${filePath}';`;
  }

  protected printObjectImport(field: Field) {
    const { kebab } = names(field.type);
    return this.printImport(
      this.printObjectPropertyType(field),
      `../${kebab}/${kebab}-${this.printObjectPropertyFileNameSuffix()}.dto.js`,
    );
  }

  protected printPropertyImports(field: Field) {
    switch (field.kind) {
      case 'object': {
        return this.printObjectImport(field);
      }
      case 'enum': {
        return this.printDefaultImport('* as P', '../../prisma/client.js');
      }
      case 'unsupported':
      case 'scalar':
        return undefined;
    }
  }
  protected printPropertiesImports(): string {
    const set = new Set(
      this.fields()
        .filter((field) => this.model.name !== field.type)
        .map((field) => this.printPropertyImports(field))
        .filter((e) => e),
    );

    return [...set].join('\n');
  }

  protected fields(): Field[] {
    return this.model.fields
      .map((field) => this.mapField(field))
      .filter((field) => this.filterProperty(field));
  }

  protected printCommonImports() {
    return `import { ObjectType, Prop } from '@beemood/nestjs/graphql';`;
  }

  protected printImports(): string {
    return [this.printCommonImports(), this.printPropertiesImports()].join(
      '\n',
    );
  }

  protected printClassDefinition(): string {
    return `export class ${this.printClassName()}`;
  }

  print(): string {
    return [
      this.printImports(),
      this.printClassDecorator(),
      this.printClassDefinition(),
      '{',
      this.printProperties(),
      '}',
    ].join('\n');
  }
}
