// import { Any } from './types.js';

// export enum PropType {
//   String = 'String',
//   Number = 'Number',
//   Boolean = 'Boolean',
//   Date = 'Date',
//   Buffer = 'Buffer',
//   Array = 'Array',
//   Object = 'Object',
// }

// export type StringFormat = 'email' | 'password' | 'uuid';
// export type NumberFormat =
//   | 'integer'
//   | 'rate'
//   | 'percent'
//   | 'fraction'
//   | 'binary';

// export type CommonOptions = {
//   type?: PropType;
//   required?: boolean;
// };

// export type DefaultValueOption<T> = {
//   defaultValue: T;
// };

// export type StringOptions = {
//   type?: PropType.String;
//   minLength?: number;
//   maxLength?: number;
//   format?: StringFormat;
//   defaultValue: number;
//   isIn?: string[];
//   isNotIn?: string[];
//   pattern?: RegExp;
// } & DefaultValueOption<string>;

// export type NumberOptions = {
//   type?: PropType.Number;
//   minimum?: number;
//   maximum?: number;
//   format?: NumberFormat;
//   isIn?: number[];
//   isNotIn?: number[];
// } & DefaultValueOption<number>;

// export type BooleanOptions = {
//   type?: PropType.Boolean;
// } & DefaultValueOption<boolean>;

// export type DateOptions = {
//   type?: PropType.Date;
//   future?: boolean;
//   past?: boolean;
// } & DefaultValueOption<Date>;

// export type BufferOptions = {
//   type?: PropType.Buffer;
//   maxBufferSize?: number;
//   minBufferSize?: number;
// } & DefaultValueOption<Buffer>;

// export type ObjectOptions = {
//   type?: PropType.Object;
//   defaultValue?: Any;
// } & DefaultValueOption<Any>;

// export type __ArrayOptions<T> = {
//   type?: PropType.Array;
//   minArraySize?: number;
//   maxArraySize?: number;
//   items?: T;
// };

// export type ArrayStringOptions = __ArrayOptions<StringOptions> &
//   DefaultValueOption<string>;

// export type ArrayNumberOptions = __ArrayOptions<NumberOptions> &
//   DefaultValueOption<number>;

// export type ArrayBooleanOptions = __ArrayOptions<BooleanOptions> &
//   DefaultValueOption<boolean>;

// export type ArrayDateOptions = __ArrayOptions<DateOptions> &
//   DefaultValueOption<Date>;

// export type ArrayBufferOptions = __ArrayOptions<BufferOptions> &
//   DefaultValueOption<Buffer>;

// export type ArrayObjectOptions = __ArrayOptions<ObjectOptions> &
//   DefaultValueOption<Any>;

// export type __PropOptions = CommonOptions &
//   (
//     | StringOptions
//     | NumberOptions
//     | BooleanOptions
//     | DateOptions
//     | BufferOptions
//     | ObjectOptions
//     | ArrayStringOptions
//     | ArrayNumberOptions
//     | ArrayBooleanOptions
//     | ArrayDateOptions
//     | ArrayBufferOptions
//     | ArrayObjectOptions
//   );

// export type PropOptions = __PropOptions | __ArrayOptions<__PropOptions>;
