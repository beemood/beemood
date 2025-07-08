export type GeneratedSchema = 'id'|'uuid'|'createdAt'|'updatedAt'|'deletedAt'

export type IconSchema = 'home'

export type IntegerFormatSchema = 'rate'|'percent'

export type ModelNameSchema = 'User'|'Role'|'Permission'|'Product'|'Category'

export type NumberFormatSchema = 'rate'|'percent'

export type OnDeleteSchema = 'cascade'

export type PropertyNameSchema = 'id'|'createdAt'|'updatedAt'|'deletedAt'|'username'|'password'|'name'|'role'|'roles'|'permission'|'permissions'|'category'

export type PropertyTypeSchema = 'string'|'number'|'integer'|'boolean'|'object'|'array'

export type RelationTypeSchema = 'one-to-one'|'one-to-many'|'many-to-many'|'many-to-one'

export type StringFormatSchema = 'email'|'password'|'phone'

export type ModelSchema = { properties?:Record<PropertyNameSchema,PropertySchema>; relations?:Record<PropertyNameSchema,RelationPropertySchema>; uniques?:PropertyNameSchema[]; }

export type ArrayPropertySchema = { type:'array'; minSize?:number; maxSize?:number; items:PropertySchema; defaultValue?:any[]; }

export type BooleanPropertySchema = { type:'boolean'; defaultValue?:boolean; }

export type CommonPropertySchema = { type:PropertyTypeSchema; name?:PropertyNameSchema; description?:string; required?:boolean; unique?:boolean; readOnly?:boolean; writeOnly?:boolean; generated?:GeneratedSchema; }

export type IntegerPropertySchema = { type:'integer'; minimum?:number; maximum?:number; isIn?:number[]; notIn?:number[]; format?:IntegerFormatSchema; defaultValue?:number; }

export type NumberPropertySchema = { type:'number'; minimum?:number; maximum?:number; isIn?:number[]; notIn?:number[]; format?:NumberFormatSchema; defaultValue?:number; }

export type ObjectPropertySchema = { type:'object'; target?:ModelNameSchema; }

export type PropertySchema = (& CommonPropertySchema& (| StringPropertySchema| NumberPropertySchema| IntegerPropertySchema| BooleanPropertySchema| ObjectPropertySchema| ArrayPropertySchema))

export type RelationPropertySchema = { type:RelationTypeSchema; required?:boolean; target?:ModelNameSchema; onDelete?:OnDeleteSchema; }

export type StringPropertySchema = { type:'string'; minLength?:number; maxLength?:number; isIn?:string[]; notIn?:string[]; format?:StringFormatSchema; defaultValue?:string; }

export type Model = { properties?:Record<PropertyNameSchema,PropertySchema>; relations?:Record<PropertyNameSchema,RelationPropertySchema>; uniques?:PropertyNameSchema[]; }