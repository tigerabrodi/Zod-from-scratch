export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>
  | ZodOptional<ZodType>

export interface ZodOptional<Type extends ZodType> {
  type: Type['type']
  isOptional: true
  parse(val: unknown): Infer<Type> | undefined | null
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
}

export interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<Infer<Type>>
  optional(): Omit<ZodOptional<ZodArray<Type>>, 'optional'>
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
  optional(): {
    type: 'object'
    fields: Type
    parse(val: unknown): InferZodObject<ZodObject<Type>> | undefined | null
  }
}

export type Infer<Type extends ZodType> = Type extends ZodUnknown
  ? unknown
  : Type extends ZodString
  ? string
  : Type extends ZodNumber
  ? number
  : Type extends ZodArray<infer ElementType>
  ? Array<Infer<ElementType>>
  : Type extends ZodObject<Record<string, ZodType>>
  ? InferZodObject<Type>
  : 'invalid type'

export type InferZodObject<Type extends ZodObject<Record<string, ZodType>>> = {
  // keys of fields and their inferred types
  [Key in keyof Type['fields']]: Infer<Type['fields'][Key]>
}
