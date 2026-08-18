import { type Field } from './types.js';

export function getTsPrimiteWrapperType(field: Field) {
  switch (field.kind) {
    case 'scalar': {
      switch (field.type) {
        case 'Date':
        case 'BigInt':
        case 'String':
        case 'Boolean': {
          return field.type;
        }
        case 'Number':
        case 'Float':
        case 'Decimal':
        case 'Int': {
          return 'Number';
        }
        case 'Bytes': {
          return 'Buffer';
        }
        case 'DateTime': {
          return 'Date';
        }
        default: {
          return 'any';
        }
      }
    }
    case 'enum': {
      return `P.$Enums.${field.type};`;
    }

    case 'object':
    case 'unsupported': {
      return 'any';
    }
  }
}
export function getTsPrimitiveType(field: Field): string {
  switch (field.kind) {
    case 'scalar': {
      switch (field.type) {
        case 'String':
          return 'string';

        case 'Boolean': {
          return 'boolean ';
        }
        case 'Number':
        case 'Float':
        case 'Decimal':
        case 'Int': {
          return 'number';
        }
        case 'BigInt': {
          return 'BigInt';
        }
        case 'Bytes': {
          return 'Buffer';
        }
        case 'DateTime': {
          return 'Date';
        }
        case 'Json': {
          if (field.isList) {
            return `P.Prisma.InputJsonValue`;
          }
          return 'P.Prisma.InputJsonValue';
        }

        default: {
          return 'any';
        }
      }
    }
    case 'enum': {
      return `P.$Enums.${field.type};`;
    }

    case 'object': {
      return field.type;
    }
    case 'unsupported': {
      return 'any';
    }
  }
}
export function getTsPropertyType(field: Field): string {
  const type = getTsPrimitiveType(field);

  if (field.type === 'Json') {
    return type;
  }

  return `${type}${field.isList ? '[]' : ''}`;
}
