import type { ZodObject, ZodType } from '../types'

import { parseNullableObject, parseObject, parseOptionalObject } from '../parse'

export const object = <Type extends Record<string, ZodType>>(
  fields: Type
): ZodObject<Type> => ({
  type: 'object',
  fields,
  parse: (value: unknown) => parseObject(fields, value),
  optional: () => ({
    type: 'object',
    fields,
    isOptional: true,
    parse: (value: unknown) => parseOptionalObject(fields, value),
  }),
  nullable: () => ({
    type: 'object',
    fields,
    isNullable: true,
    parse: (value: unknown) => parseNullableObject(fields, value),
  }),
})
