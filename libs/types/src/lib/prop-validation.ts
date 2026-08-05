export type StringFormat = 'email' | 'passwor' | 'uuid';
export type __StringOptions = {
  __type: 'String';
  type?: Function;
  minLength?: number;
  maxLength?: number;
  format?: StringFormat;
};

export type NumberFormat = 'rate' | 'percent' | 'fraction';
export type __NumberOptions = {
  __type: 'Number';
  type?: Function;
  format: NumberFormat;
};

export type __BooleanOptions = { __type: 'Boolean'; type?: Function };

export type __ObjectOptions = { __type: 'Object'; type?: Function };

export type __ArrayOptions = { __type: 'Array'; type: Function };
