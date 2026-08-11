import { Field } from './types.js';

export const TIMESTAMP_FIELDS = [
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const;

export type TimestampFieldName = (typeof TIMESTAMP_FIELDS)[number];

export type TimestampField = Field & { name: TimestampFieldName };

export function isTimestampField(field: Field): field is TimestampField {
  return TIMESTAMP_FIELDS.includes(field.name as TimestampFieldName);
}
