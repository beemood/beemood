import { Field } from './dmmf.js';

export function toTsType(field: Field): string {
  let type = 'T.Any';
  const isArray = field.isList ? '[]' : '';

  switch (field.kind) {
    case 'object': {
      type = `P.${field.type}`;
      break;
    }
    case 'scalar': {
      switch (field.type) {
        case 'String': {
          type = 'string';
          break;
        }
        case 'Float':
        case 'Decimal':
        case 'Int': {
          type = 'number';
          break;
        }

        case 'Boolean': {
          type = 'boolean';
          break;
        }
        case 'Date':
        case 'DateTime': {
          type = 'Date';
          break;
        }
        case 'Json': {
          type = 'JsonValue';
          break;
        }
      }
      break;
    }
    case 'enum': {
      type = `P.${field.type}`;
      break;
    }
    case 'unsupported': {
      type = 'T.Any';
      break;
    }
  }

  return `${type}${isArray}`;
}
