import { Model } from '../common/dmmf.js';
import { filterCreateDtoField } from './dto-field-filters.js';
import { printApiPropertyDecorator } from './print-api-property-decorator.js';
import { printDtoProperty } from './print-dto-property.js';

export function printCreateDto(model: Model) {
  const fields = model.fields
    .filter(filterCreateDtoField)
    .map((field) => {
      return `${printApiPropertyDecorator(field)}${printDtoProperty(field)}`;
    })
    .join('\n');
  return `export class Create${model.name}Dto { ${fields} }`;
}
