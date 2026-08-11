import { getPropertyType } from '../../common/get-property-type.js';
import { isCreateDtoField } from '../../common/is-create-dto-field.js';
import { isRequiredField } from '../../common/is-required-field.js';
import { toDtoClassName } from '../../common/to-dto-class-name.js';
import { Model } from '../../common/types.js';
import { printDtoClass } from './print-dto-class.js';
import { printDtoPropertyDecoratorOptions } from './print-dto-property-decorator-options.js';
import { printDtoPropertyDecorator } from './print-dto-property-decorator.js';
import { printDtoProperty } from './print-dto-property.js';

export function printCreateDtoClass(model: Model) {
  const dtoFields = model.fields.filter(isCreateDtoField);

  const dtoClassName = toDtoClassName(model.name, 'CreateDto');
  const dtoProperties = dtoFields
    .map((field) => {
      const dtoPropertyDef = printDtoProperty(
        field.name,
        getPropertyType(field),
        isRequiredField(field),
      );

      const propOptions = {};
      const dtoPropertyDecoratorOptions =
        printDtoPropertyDecoratorOptions(propOptions);
      const dtoPropertyDecorator = printDtoPropertyDecorator(
        dtoPropertyDecoratorOptions,
      );

      return [dtoPropertyDecorator, dtoPropertyDef].join(' ');
    })
    .join('\n');
  return printDtoClass(dtoClassName, dtoProperties);
}
