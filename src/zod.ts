type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>

interface ZodUnknown {
  type: 'unknown'
}
interface ZodString {
  type: 'string'
}
interface ZodNumber {
  type: 'number'
}

interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
}

interface ZodObject<ObjType extends Record<string, ZodType>> {
  type: 'object'
  fields: ObjType
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
