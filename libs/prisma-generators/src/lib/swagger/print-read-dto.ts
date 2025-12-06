import { Model } from '../common/dmmf.js';
import { filterReadDtoField } from './dto-field-filters.js';
import { printApiPropertyDecorator } from './print-api-property-decorator.js';
import { printDtoProperty } from './print-dto-property.js';

export function printReadDto(model: Model) {
  const fields = model.fields
    .filter(filterReadDtoField)
    .map((field) => ({ ...field, isRequired: false }))
    .map((field) => {
      return `${printApiPropertyDecorator(field)}${printDtoProperty(field)}`;
    })
    .join('\n');

  return `export class Read${model.name}Dto { ${fields} }`;
}
