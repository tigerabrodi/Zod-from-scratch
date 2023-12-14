const string = (): ZodString => ({ type: 'string' })
const number = (): ZodNumber => ({ type: 'number' })
const unknown = (): ZodUnknown => ({ type: 'unknown' })
const array = <Type extends ZodType>(element: Type): ZodArray<Type> => ({
  type: 'array',
  element,
})
const object = <Type extends Record<string, ZodType>>(
  fields: Type
): ZodObject<Type> => ({
  type: 'object',
  fields,
})

export const z = {
  string,
  number,
  unknown,
  array,
  object,
}
