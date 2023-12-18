export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>
  | ZodOptional<ZodType>
  | ZodNullable<ZodType>

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

export interface ZodUnknown {
  type: 'unknown'
  parse(val: unknown): unknown
}

export interface ZodString {
  type: 'string'
  parse(val: unknown): string
  optional(): Omit<ZodOptional<ZodString>, 'optional'>
}

export interface ZodNumber {
  type: 'number'
  parse(val: unknown): number
  optional(): Omit<ZodOptional<ZodNumber>, 'optional'>
  nullable(): Omit<ZodNullable<ZodNumber>, 'nullable'>
}

export interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<Infer<Type>>
  optional(): Omit<ZodOptional<ZodArray<Type>>, 'optional'>
  nullable(): Omit<ZodNullable<ZodArray<Type>>, 'nullable'>
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
  optional(): Omit<ZodOptional<ZodObject<Type>>, 'optional'>
  nullable(): Omit<ZodNullable<ZodObject<Type>>, 'nullable'>
}

export type Infer<Type extends ZodType> = Type extends ZodUnknown
  ? unknown
  : Type extends ZodString
  ? string
  : Type extends ZodNumber
  ? number
  : Type extends ZodArray<infer ElementType>
  ? Array<Infer<ElementType>>
  : Type extends ZodObject<infer ObjectType>
  ? InferObject<ObjectType>
  : Type extends ZodOptional<infer WrappedType>
  ? Infer<WrappedType> | undefined | null
  : never

// Simplified type for object inference
export type InferObject<ObjectType extends Record<string, ZodType>> = {
  [Key in keyof ObjectType]: Infer<ObjectType[Key]>
}

// Simplified type for InferZodObject
export type InferZodObject<Type extends ZodObject<Record<string, ZodType>>> =
  InferObject<Type['fields']>
