import { toDtoClassName } from './to-dto-class-name.js';
import { Field } from './types.js';

export function getTsPropertyType(field: Field) {
  let type = '';
  switch (field.kind) {
    case 'scalar': {
      switch (field.type) {
        case 'String':
          type = 'string';
          break;
        case 'Boolean': {
          type = 'boolean ';
          break;
        }
        case 'Number':
        case 'Float':
        case 'Decimal':
        case 'Int': {
          type = 'number';
          break;
        }
        case 'BigInt': {
          type = 'BigInt';
          break;
        }
        case 'Bytes': {
          type = 'Buffer';
          break;
        }
        case 'DateTime': {
          type = 'Date';
          break;
        }
        case 'Json': {
          type = 'P.Prisma.InputJsonValue';

          if (field.isList) {
            return `P.Prisma.InputJsonValue`;
          }
          break;
        }
      }
      break;
    }
    case 'object': {
      const objectDtoName = toDtoClassName(field.name, 'CreateDto');
      type = objectDtoName;
      break;
    }
    case 'enum': {
      type = `P.$Enums.${field.type};`;
      break;
    }
    case 'unsupported':
  }

  return `${type}${field.isList ? '[]' : ''}`;
}
