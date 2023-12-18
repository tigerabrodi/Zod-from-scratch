export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>
  | ZodOptional<ZodType>
  | ZodNullable<ZodType>
  | ZodEnum<Array<string>>

type OptionalOrNullable = 'optional' | 'nullable'

export interface ZodOptional<Type extends ZodType> {
  type: Type['type']
  isOptional: true
  parse(val: unknown): Infer<Type> | undefined | null
}

export interface ZodNullable<Type extends ZodType> {
  type: Type['type']
  isNullable: true
  parse(val: unknown): Infer<Type> | null
}

// enum is an array of strings, when inferring the type we want to return a union of the string in typescript
export interface ZodEnum<Enum extends Array<string>> {
  type: 'enum'
  values: Enum
  parse(val: unknown): Enum[number]
  // optional(): Omit<ZodOptional<ZodEnum<Enum>>, OptionalOrNullable>
  // nullable(): Omit<ZodNullable<ZodEnum<Enum>>, OptionalOrNullable>
}

export interface ZodUnknown {
  type: 'unknown'
  parse(val: unknown): unknown
}

export interface ZodString {
  type: 'string'
  parse(val: unknown): string
  optional(): Omit<ZodOptional<ZodString>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodString>, OptionalOrNullable>
}

export interface ZodNumber {
  type: 'number'
  parse(val: unknown): number
  optional(): Omit<ZodOptional<ZodNumber>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodNumber>, OptionalOrNullable>
}

export interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<InferElementType<Type>>
  optional(): Omit<ZodOptional<ZodArray<Type>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodArray<Type>>, OptionalOrNullable>
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
  optional(): Omit<ZodOptional<ZodObject<Type>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodObject<Type>>, OptionalOrNullable>
}

export type Infer<Type extends ZodType> = Type extends ZodUnknown
  ? unknown
  : Type extends ZodString
  ? string
  : Type extends ZodNumber
  ? number
  : Type extends ZodArray<infer ElementType>
  ? Array<InferElementType<ElementType>>
  : Type extends ZodObject<infer ObjectType>
  ? InferObject<ObjectType>
  : Type extends ZodOptional<infer WrappedType>
  ? Infer<WrappedType> | undefined | null
  : never

// simplifying the types to avoid the error "Type instantiation is excessively deep and possibly infinite"

// Simplified type for array inference
export type InferElementType<ElementType> = ElementType extends ZodType
  ? Infer<ElementType>
  : never

// Simplified type for object inference
export type InferObject<ObjectType extends Record<string, ZodType>> = {
  [Key in keyof ObjectType]: Infer<ObjectType[Key]>
}

// Simplified type for InferZodObject
export type InferZodObject<Type extends ZodObject<Record<string, ZodType>>> =
  InferObject<Type['fields']>
