import {
  type FieldAnalizer,
  type FieldTypeSuffix,
} from '@beemood/prisma-helpers';
import { type BasePropertyPrinterOptions } from '@beemood/utils';

export function toPropertyOptions(
  analizer: FieldAnalizer,
  typeSuffixes: FieldTypeSuffix = {},
): BasePropertyPrinterOptions {
  return {
    name: analizer.fieldName(),
    comment: analizer.docs(),
    padding: 2,
    required: analizer.isRequired(),
    type: analizer.type(typeSuffixes),
    isArray: analizer.isArray(),
  };
}
