import type { ZodArray, ZodType } from '../zod-types'

import { parseArray, parseNullableArray, parseOptionalArray } from '../helpers'

export const array = <Type extends ZodType>(element: Type): ZodArray<Type> => ({
  type: 'array',
  element,
  parse: (value: unknown) => parseArray(element, value),
  optional: () => ({
    type: 'array',
    element,
    isOptional: true,
    parse: (value: unknown) => parseOptionalArray(element, value),
  }),

  nullable: () => ({
    type: 'array',
    element,
    isNullable: true,
    parse: (value: unknown) => parseNullableArray(element, value),
  }),
})
