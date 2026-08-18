import { type Field } from '../../common/types.js';

export function printOrderByDtoProperty(field: Field): string {
  return `@Prop({ isIn: ['asc', 'desc' ] }) ${field.name}?:P.Prisma.SortOrder`;
}
