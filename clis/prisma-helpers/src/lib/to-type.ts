import {
  type Field,
  ScalarBoxTypeMap,
  ScalarPrimitiveTypeMap,
  type ScalarType,
} from './types.js';

export function toType(field: Field): string {
  switch (field.kind) {
    case 'enum':
    case 'object': {
      return field.type;
    }
    case 'scalar': {
      return (
        ScalarPrimitiveTypeMap[field.type as ScalarType] ??
        ScalarPrimitiveTypeMap.Unsupported
      );
    }
    case 'unsupported': {
      return ScalarPrimitiveTypeMap.Unsupported;
    }
  }
}

export function toBoxType(field: Field) {
  switch (field.kind) {
    case 'enum':
    case 'object': {
      return field.type;
    }
    case 'scalar': {
      return (
        ScalarBoxTypeMap[field.type as ScalarType] ??
        ScalarBoxTypeMap.Unsupported
      );
    }
    case 'unsupported': {
      return ScalarBoxTypeMap.Unsupported;
    }
  }
}
