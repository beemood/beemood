import { Field } from '../common/dmmf.js';
import { toSwaggerType } from '../common/to-swagger-type.js';

export function printApiPropertyDecorator(field: Field) {
  const swaggerType = toSwaggerType(field);
  const typeOption =
    field.kind === 'enum'
      ? `enum: ${swaggerType}`
      : `type: ${toSwaggerType(field)}`;

  const requiredOption = field.isRequired ? 'required: true' : 'required: false';
  const isArrayOption = field.isList ? 'isArray: true' : '';

  const propertyOptions = [typeOption, isArrayOption, requiredOption]
    .filter((e) => e)
    .join(',');

  return `@ApiProperty({ ${propertyOptions} })`;
}
