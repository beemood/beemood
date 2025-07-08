import { PropertyValidationOptions, Validation } from '@beemood/validation';


export type PropertyOptions = PropertyValidationOptions ;

export function Property(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    Validation(options)(...args);
  };
}
