import { PrimitiveTypeMap } from './scalar-type-map.js';
import { type Field, type FieldDefault, type Model } from './types.js';

export type FieldTypeSuffix = {
  scalar?: string;
  object?: string;
  enum?: string;
};

export class FieldAnalizer {
  constructor(
    protected model: Model,
    protected readonly field: Field,
  ) {}

  docs() {
    return this.field.documentation ?? '';
  }
  modelName() {
    return this.model.name;
  }

  fieldName() {
    return this.field.name;
  }
  isSameModel() {
    return this.field.type === this.model.name;
  }

  protected m(exp: RegExp) {
    return exp.test(this.field.documentation ?? '');
  }

  isArray() {
    return this.field.isList === true;
  }

  isUuid() {
    return (this.field.default as FieldDefault)?.name === 'uuid';
  }

  isHidden() {
    return this.m(/@hidden/gi);
  }

  isInclude() {
    return this.m(/@include/gi);
  }

  isInternal() {
    return this.m(/@internal/gi);
  }

  isRelation() {
    return this.field.kind === 'object';
  }

  isTimestamp() {
    return new Set(['createdAt', 'updatedAt', 'deletedAt']).has(
      this.field.name,
    );
  }

  isInternalOperation() {
    return (
      this.field.isId ||
      this.isTimestamp() ||
      this.isRelation() ||
      this.isInternal() ||
      this.isUuid()
    );
  }

  isRequired() {
    if (
      this.isInternalOperation() ||
      this.field.hasDefaultValue ||
      this.field.isList
    ) {
      return false;
    }

    return !!this.field.isRequired;
  }

  isReadonly() {
    return this.m(/@readonly/gi);
  }

  isWriteonly() {
    return this.m(/@writeonly/gi);
  }

  protected __type(suffixes: FieldTypeSuffix = {}) {
    const { kind, type } = this.field;
    switch (kind) {
      case 'scalar': {
        return PrimitiveTypeMap[type] + (suffixes.scalar ?? '');
      }
      case 'object':
        return `${type}${suffixes.object ?? ''}`;
      case 'enum': {
        return `${type}${suffixes.enum ?? ''}`;
      }
      case 'unsupported': {
        return 'unknown';
      }
    }
  }
  type(suffixes: FieldTypeSuffix = {}) {
    return `${this.__type(suffixes)}`;
  }
}
