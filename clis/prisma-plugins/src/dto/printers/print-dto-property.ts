import { extractAnnotations } from '@beemood/utils';
import { getTsPropertyType } from '../../common/get-ts-property-type.js';
import { isRequiredField } from '../../common/is-required-field.js';
import { Field } from '../../common/types.js';
import { normalizeDtoPropertyOptions } from './normalize-dto-property-options.js';
import { printDtoPropertyDecoratorOptions } from './print-dto-property-decorator-options.js';
import { printDtoPropertyDecorator } from './print-dto-property-decorator.js';
import { printDtoPropertyDefinition } from './print-dto-property-definitinon.js';

export function printDtoProperty(field: Field) {
  const name = field.name;
  const type = getTsPropertyType(field);
  const isRequired = isRequiredField(field);
  const annotations = extractAnnotations(field.documentation ?? '');
  const propertyDefinition = printDtoPropertyDefinition(name, type, isRequired);
  const decoratorOptions = printDtoPropertyDecoratorOptions(
    normalizeDtoPropertyOptions(annotations, isRequired),
  );

  const decoratorFunc = printDtoPropertyDecorator(decoratorOptions);

  return [decoratorFunc, propertyDefinition].join(' ');
}
