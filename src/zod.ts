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

interface ZodArray<T extends ZodType> {
  type: 'array'
  element: T
}

interface ZodObject<T extends Record<string, ZodType>> {
  type: 'object'
  fields: T
}

type Infer<T extends ZodType> = T extends ZodUnknown
  ? unknown
  : T extends ZodString
  ? string
  : T extends ZodNumber
  ? number
  : T extends ZodArray<infer E>
  ? Array<Infer<E>>
  : T extends ZodObject<Record<string, ZodType>> // <-- over here
  ? InferZodObject<T>
  : 'invalid type'

type InferZodObject<T extends ZodObject<Record<string, ZodType>>> = {
  [Key in keyof T['fields']]: Infer<T['fields'][Key]>
}
