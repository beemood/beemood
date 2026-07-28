import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Field } from '../../common/types.js';

export function printProjectionDtoProperty(field: Field) {
  const type = () => {
    switch (field.kind) {
      case 'scalar':
      case 'enum': {
        return `boolean`;
      }
      case 'object': {
        if (field.isList) {
          return `${toDtoClassName(field.type, 'FindManyDto')}`;
        } else {
          return `${toDtoClassName(field.type, 'FindManyDto')}`;
        }
      }
      case 'unsupported': {
        return `boolean`;
      }
    }
  };

  return `@Prop() ${field.name}?:${type()}`;
}
