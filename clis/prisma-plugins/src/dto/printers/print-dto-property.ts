import { getTsPropertyType } from '../../common/get-ts-property-type.js';
import { isRequiredField } from '../../common/is-required-field.js';
import { Field } from '../../common/types.js';
import { printDtoPropertyDecoratorOptions } from './print-dto-property-decorator-options.js';
import { printDtoPropertyDecorator } from './print-dto-property-decorator.js';
import { printDtoPropertyDefinition } from './print-dto-property-definitinon.js';

export function printDtoProperty(field: Field, isRequired?: boolean) {
  const name = field.name;
  const type = getTsPropertyType(field);
  isRequired ??= isRequiredField(field);
  const propertyDefinition = printDtoPropertyDefinition(name, type, isRequired);
  const decoratorOptions = printDtoPropertyDecoratorOptions(field, isRequired);

  const decoratorFunc = printDtoPropertyDecorator(decoratorOptions);

  return [decoratorFunc, propertyDefinition].join(' ');
}
