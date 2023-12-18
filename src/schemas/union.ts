import type { ZodType, ZodUnion } from '../types'

import { parseOptionalUnion, parseUnion } from '../parse'

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
})
