import { toDtoClassName } from '../../common/to-dto-class-name.js';
import {
  CommonDtoClassNames,
  Field,
  ScalarFieldType,
} from '../../common/types.js';

export function printWhereDtoProperty(field: Field) {
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
            return CommonDtoClassNames.NumberFilterDto;
          case 'String':
            return CommonDtoClassNames.StringFilterDto;
          case 'JSON':
          case 'Bytes':
          case 'BigInt': {
            throw new Error('Not supported!');
          }
        }
      }
      case 'enum': {
        return `Enum${field.type}FilterDto`;
      }
      case 'unsupported': {
        throw new Error('Not supported');
      }
    }
  };

  return `@Prop() ${field.name}?: ${dtoType()}`;
}
