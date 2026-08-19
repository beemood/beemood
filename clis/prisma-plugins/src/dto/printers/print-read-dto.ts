import {
  type Field,
  type Model,
  parsePropertyValidationOptions,
  ScalarPrimitiveTypeMap,
  type ScalarType,
} from '@beemood/prisma-helpers';

export function printReadDtoType(field: Field) {
  switch (field.kind) {
    case 'object': {
      return `${field.type}ReadDto`;
    }
    case 'scalar': {
      return ScalarPrimitiveTypeMap[field.type as ScalarType];
    }
    case 'enum': {
      return field.type;
    }
    case 'unsupported': {
      return ScalarPrimitiveTypeMap.Unsupported;
    }
  }
}

export function printReadDtoDecoratorOptions(field: Field) {
  const options = Object.entries(parsePropertyValidationOptions(field)).reduce(
    (acc, [key, value]) => {
      if (key !== 'type') {
        acc.push(`${key}: ${value}`);
      }
      return acc;
    },
    [] as string[],
  );

  if (field.kind === 'object' || field.isList) {
    if (field.kind === 'object') {
      options.unshift(`type: ()=>${field.type}ReadDto`);
    }
  }
  return options.length > 0 ? `{ ${options.join(',')} }` : '';
}

export function printReadDtoDecorator(_field: Field, options = '') {
  return `@Prop(${options})`;
}
export function printReadDtoProperty(
  field: Field,
  isRequired?: boolean,
): string {
  isRequired ??= field.isRequired;

  const decorator = printReadDtoDecorator(
    field,
    printReadDtoDecoratorOptions(field),
  );
  const type = `${printReadDtoType(field)}${field.isList ? '[]' : ''}`;
  const isRequiredMark = `${isRequired ? '' : '?'}`;
  return `${decorator} ${field.name}${isRequiredMark}: ${type};`;
}
export function printReadDto(model: Model): string {
  return [
    `import { Prop } from '@beemood/prop/graphql';`,

    `export class ${model.name}ReadDto {`,
    model.fields.map((field) => printReadDtoProperty(field)).join('\n  '),
    `}`,
  ].join('\n');
}
