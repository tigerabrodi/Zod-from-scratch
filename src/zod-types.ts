export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>

export interface ZodUnknown {
  type: 'unknown'
  parse(val: unknown): unknown
}

export interface ZodString {
  type: 'string'
  parse(val: unknown): string
  optional(): {
    type: 'string'
    parse(val: unknown): string | undefined | null
  }
}

export interface ZodNumber {
  type: 'number'
  parse(val: unknown): number
  optional(): {
    type: 'number'
    parse(val: unknown): number | undefined | null
  }
}

export interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<Infer<Type>>
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
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

export type InferZodObject<T extends ZodObject<Record<string, ZodType>>> = {
  // keys of fields and their inferred types
  [Key in keyof T['fields']]: Infer<T['fields'][Key]>
}
