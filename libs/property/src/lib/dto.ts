import { Exclude } from 'class-transformer';

export function Dto(): ClassDecorator {
  return (...args) => {
    Exclude()(...args);
  };
}
