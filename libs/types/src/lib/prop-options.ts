import { PropArrayOptions } from './prop-array-options.js';
import { PropBooleanOptions } from './prop-boolean-options.js';
import { PropNumberOptions } from './prop-number-options.js';
import { PropObjectOptions } from './prop-object-options.js';
import { PropStringOptions } from './prop-string-options.js';

export type PropOptions = Readonly<
  Partial<
    | PropStringOptions
    | PropNumberOptions
    | PropBooleanOptions
    | PropObjectOptions
    | PropArrayOptions
  >
>;
