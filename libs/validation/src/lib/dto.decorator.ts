import { Exclude } from 'class-transformer';
/**
 * Class decorator for dto classes
 * @returns class decorator
 */
export function Dto(): ClassDecorator {
  return (...args) => {
    Exclude()(...args);
  };
}
