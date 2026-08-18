// // Any abstract or concrete constructor function
// export type AnyConstructor = abstract new (...args: any[]) => any;

// /**
//  * Class / Static Member / Constructor Parameter Target
//  * Represents the constructor function itself.
//  */
// export type ConstructorTarget<T extends AnyConstructor = AnyConstructor> = T & {
//   name: string;
//   prototype: InstanceType<T>;
//   length: number; // Number of constructor parameters
// };

// /**
//  * Instance Member Target
//  * Represents the prototype object of the class instance.
//  */
// export type InstancePrototypeTarget<T extends object = object> = T & {
//   constructor: ConstructorTarget<abstract new (...args: any[]) => T>;
// };

// // ==========================================
// // Strongly Typed Decorator Signatures
// // ==========================================

// export type StrictClassDecorator<
//   TCtor extends AnyConstructor = AnyConstructor,
// > = (target: ConstructorTarget<TCtor>) => TCtor | void;

// export type StrictMethodDecorator<
//   TTarget extends object = object,
//   TValue extends (...args: any[]) => any = (...args: any[]) => any,
// > = (
//   target: TTarget extends AnyConstructor
//     ? ConstructorTarget<TTarget>
//     : InstancePrototypeTarget<TTarget>,
//   propertyKey: string | symbol,
//   descriptor: TypedPropertyDescriptor<TValue>,
// ) => TypedPropertyDescriptor<TValue> | void;

// export type StrictPropertyDecorator<
//   TTarget extends object = object,
//   TValue extends (...args: any[]) => any = (...args: any[]) => any,
// > = (
//   target: TTarget extends AnyConstructor
//     ? TTarget
//     : InstancePrototypeTarget<TTarget>,
//   propertyKey: string | symbol,
//   descriptor?: TypedPropertyDescriptor<TValue>,
// ) => TypedPropertyDescriptor<TValue> | void;

// export type StrictParameterDecorator<TTarget extends object = object> = (
//   target: TTarget extends AnyConstructor
//     ? ConstructorTarget<TTarget>
//     : InstancePrototypeTarget<TTarget>,
//   propertyKey: string | symbol,
//   parameterIndex: number,
// ) => void;

// export type StrictConstructorParameterDecorator<
//   TCtor extends AnyConstructor = AnyConstructor,
// > = (
//   target: ConstructorTarget<TCtor>,
//   propertyKey: undefined,
//   parameterIndex: number,
// ) => void;
