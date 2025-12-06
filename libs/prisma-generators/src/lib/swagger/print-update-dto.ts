import { Model } from '../common/dmmf.js';
import { filterUpdateDtoField } from './dto-field-filters.js';
import { printApiPropertyDecorator } from './print-api-property-decorator.js';
import { printDtoProperty } from './print-dto-property.js';

export function printUpdateDto(model: Model) {
  const fields = model.fields
    .filter(filterUpdateDtoField)
    .map((e) => ({ ...e, isRequired: false }))
    .map((field) => {
      return `${printApiPropertyDecorator(field)}${printDtoProperty(field)}`;
    })
    .join('\n');

  return `export class Update${model.name}Dto { ${fields} }`;
}
