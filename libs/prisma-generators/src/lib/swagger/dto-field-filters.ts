import { Some } from '@beemood/types';
import { Field } from '../common/dmmf.js';

export function isTimestampField(field: Field) {
  if (
    field.name === 'createdAt' ||
    field.name === 'updatedAt' ||
    field.name === 'deletedAt'
  ) {
    return true;
  }

  return false;
}

export function isReadOnly(field: Field) {
  if (field.isReadOnly == true) {
    return true;
  }

  if ((field.default as Some<{ name: string }>)?.name === 'uuid') {
    return true;
  }

  if (field.isUpdatedAt == true) {
    return true;
  }

  if (field.isId == true) {
    return true;
  }

  if (field.documentation?.includes('@readonly')) {
    return true;
  }

  return false;
}

export function isGeneratedField(field: Field) {
  if ((field.default as Some<{ name: string }>)?.name) {
    return true;
  }

  if (field.isGenerated == true) {
    return true;
  }

  if (field.isId == true) {
    return true;
  }

  if (isTimestampField(field)) {
    return true;
  }

  return false;
}

export function filterReadDtoField(field: Field) {
  if (field.documentation?.includes('@hidden')) {
    return false;
  }

  if (field.relationName != undefined) {
    return false;
  }

  return true;
}

export function filterCreateDtoField(field: Field) {
  if (isGeneratedField(field)) {
    return false;
  }

  if (field.relationName != undefined) {
    return false;
  }

  return true;
}

export function filterUpdateDtoField(field: Field) {
  if (isGeneratedField(field)) {
    return false;
  }

  if (field.relationName != undefined) {
    return false;
  }

  if (isReadOnly(field)) {
    return false;
  }

  return true;
}
