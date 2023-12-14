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

type ZodType = ZodUnknown | ZodString | ZodNumber | ZodArray<ZodType>

type Infer<T extends ZodType> = T extends ZodUnknown
  ? unknown
  : T extends ZodString
  ? string
  : T extends ZodNumber
  ? number
  : T extends ZodArray<infer U>
  ? Array<Infer<U>>
  : never

type nested = Infer<ZodArray<ZodArray<ZodString>>>
