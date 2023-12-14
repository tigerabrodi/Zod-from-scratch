import type {
  ZodArray,
  InferZodObject,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodType,
  ZodUnknown,
} from './zod-types'

const string = (): ZodString => ({
  type: 'string',
  parse: (value: unknown) => {
    if (typeof value !== 'string') throw new Error('Invalid type, not a string')
    return value
  },
})

const number = (): ZodNumber => ({
  type: 'number',
  parse: (value: unknown) => {
    if (typeof value !== 'number') throw new Error('Invalid type, not a number')
    return value
  },
})

const unknown = (): ZodUnknown => ({
  type: 'unknown',
  parse: (value: unknown) => value,
})

const array = <Type extends ZodType>(element: Type): ZodArray<Type> => ({
  type: 'array',
  element,
  parse: (value: unknown) => {
    if (!Array.isArray(value)) throw new Error('Invalid type, not an array')
    value.forEach((v) => element.parse(v))
    return value
  },
})

const object = <Type extends Record<string, ZodType>>(
  fields: Type
): ZodObject<Type> => ({
  type: 'object',
  fields,
  parse: (value: unknown) => {
    if (typeof value !== 'object' || value == null)
      throw new Error('Not an object')

    const recordValue = value as Record<string, unknown>

    // Check that each key in `this.fields` is present in the `value`, and its
    // value parses by the corresponding entry in `value`
    Object.entries(fields).forEach(([key, val]) => val.parse(recordValue[key]))

    return value as InferZodObject<ZodObject<Type>>
  },
})

export const z = {
  string,
  number,
  unknown,
  array,
  object,
}
