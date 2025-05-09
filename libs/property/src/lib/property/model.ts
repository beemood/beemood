import { Exclude } from 'class-transformer';

/**
 * Dto model decorator
 * @returns ClassDecorator
 */
export function Model(): ClassDecorator {
  return (...args) => {
    Exclude()(...args);
  };
}
