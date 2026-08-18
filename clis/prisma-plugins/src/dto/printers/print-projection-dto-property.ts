import { type Field } from '../../common/types.js';

export function printProjectionDtoProperty(field: Field) {
  const type = () => {
    switch (field.kind) {
      case 'scalar':
      case 'enum': {
        return `boolean`;
      }
      case 'object':
        return true;
      case 'unsupported': {
        return `boolean`;
      }
    }
  };

  return `@Prop() ${field.name}?:${type()}`;
}
