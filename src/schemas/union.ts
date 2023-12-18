import type { ZodType, ZodUnion } from '../types'

import { parseNullableUnion, parseOptionalUnion, parseUnion } from '../parse'

export const union = <Options extends Array<ZodType>>(
  options: Options
): ZodUnion<Options> => ({
  type: 'union',
  options,
  parse: (value: unknown) => parseUnion(options, value),
  optional: () => ({
    type: 'union',
    isOptional: true,
    options,
    parse: (value: unknown) => parseOptionalUnion(options, value),
  }),
  nullable: () => ({
    type: 'union',
    isNullable: true,
    parse: (value: unknown) => parseNullableUnion(options, value),
  }),
})
