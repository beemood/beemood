import { Field } from './dmmf.js';

export function toSwaggerType(field: Field): string {
  let type = "'string'";

  switch (field.kind) {
    case 'object': {
      type = `()=>P.${field.type}`;
      break;
    }
    case 'scalar': {
      switch (field.type) {
        case 'String': {
          type = "'string'";
          break;
        }
        case 'Int': {
          type = "'integer'";
          break;
        }
        case 'Float':
        case 'Decimal': {
          type = "'number'";
          break;
        }
        case 'Boolean': {
          type = "'boolean'";
          break;
        }
        case 'Date':
        case 'DateTime': {
          type = "'string', format: 'date-time'";
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
      type = "'string'";
      break;
    }
  }

  return type;
}
