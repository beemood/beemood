import { toDtoClassName } from '../../common/to-dto-class-name.js';
import {
  CommonDtoClassNames,
  type Field,
  type ScalarFieldType,
} from '../../common/types.js';

export function printWhereUniqueDtoProperty(field: Field) {
  const isUnique = field.isUnique || field.isId;

  const dtoType = () => {
    switch (field.kind) {
      case 'object': {
        if (field.isList) {
          return toDtoClassName(field.type, 'WhereManyRelationDto');
        } else {
          return toDtoClassName(field.type, 'WhereDto');
        }
      }
      case 'scalar': {
        switch (field.type as ScalarFieldType) {
          case 'Boolean': {
            return CommonDtoClassNames.BooleanFilterDto;
          }
          case 'DateTime': {
            return CommonDtoClassNames.DateFilterDto;
          }
          case 'Decimal':
          case 'Float':
          case 'Int':
            if (isUnique) {
              return 'number';
            } else {
              return CommonDtoClassNames.NumberFilterDto;
            }
          case 'String':
            if (isUnique) {
              return 'string';
            }
            return CommonDtoClassNames.StringFilterDto;
          case 'JSON':
          case 'Bytes':
          case 'BigInt': {
            throw new Error('Not supported!');
          }
        }
        break;
      }
      case 'enum': {
        return `Enum${field.type}FilterDto`;
      }

      case 'unsupported': {
        throw new Error('Not supported');
      }
    }
  };

  const isUniqueRequired = isUnique ? '' : '?';

  return `@Prop() ${field.name}${isUniqueRequired}: ${dtoType()}`;
}
