type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>

interface ZodUnknown {
  type: 'unknown'
  parse(val: unknown): unknown
}

interface ZodString {
  type: 'string'
  parse(val: unknown): string
}

interface ZodNumber {
  type: 'number'
  parse(val: unknown): number
}

interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<Infer<Type>>
}

interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
}

type Infer<Type extends ZodType> = Type extends ZodUnknown
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

type InferZodObject<T extends ZodObject<Record<string, ZodType>>> = {
  // keys of fields and their inferred types
  [Key in keyof T['fields']]: Infer<T['fields'][Key]>
}
