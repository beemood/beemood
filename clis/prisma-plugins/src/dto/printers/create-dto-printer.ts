import { type Field, type FieldDefault } from '@beemood/prisma-helpers';
import { DtoClassPrinter } from './dto-class-printer.js';

export class CreateDtoClassPrinter extends DtoClassPrinter {
  protected override printClassNameSuffix(): string {
    return 'CreateDto';
  }

  protected override printObjectPropertyNameSuffix() {
    return 'CreateDto';
  }
  protected override filterProperty(field: Field): boolean {
    return (
      field.kind !== 'object' &&
      !field.isId &&
      (field.default as FieldDefault)?.name !== 'uuid' &&
      !/(created|updated|deleted)At/.test(field.name) &&
      !/@internal/.test(field.documentation ?? '')
    );
  }
}
