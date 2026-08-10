import { Casing, ObjectType, TypeOrFactory } from './types.js';

export type PropType =
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Date'
  | 'Buffer'
  | 'Object';

export type PropCommonOptions = {
  /**
   * Primitive type of the property or array-property such as ()=>String, ()=>Number, ()=>SampleObject
   * @returns
   */
  type?: () => ObjectType;
  required?: boolean;
  exclude?: boolean;
  minArraySize?: number;
  maxArraySize?: number;
};

export type PropDateOptions = {
  minDate?: TypeOrFactory<Date>;
  maxDate?: TypeOrFactory<Date>;
};
export type PropBufferOptions = {
  minBufferSize?: number;
  maxBufferSize?: number;
};

export type PropObjectOptions = {
  target?: ObjectType;
};

export type PropBooleanOptions = {};

export type PropNumberFormatType = 'int';
export type PropNumberOptions = {
  minimum?: number;
  maximum?: number;
  numberFormat?: PropNumberFormatType;
};

export type PropStringFormat =
  | 'email'
  | 'password'
  | 'uuid'
  | 'uuid4'
  | 'uuid7'
  | 'iso8601';

export type PropStringOptions = {
  minLength?: number;
  maxLength?: number;
  stringFormat?: PropStringFormat;
  casing?: Casing;
};

export type NormalizedPropOptions = PropCommonOptions &
  PropStringOptions &
  PropNumberOptions &
  PropBooleanOptions &
  PropDateOptions &
  PropBufferOptions &
  PropObjectOptions & {
    /**
     * Name of the type
     */
    __typeName: string;

    /**
     * Class reference of the property type such as String, Number, Boolean, SampleObject, Array etc.
     */
    __type: ObjectType;
  };

export type PropOptions = Partial<NormalizedPropOptions>;
