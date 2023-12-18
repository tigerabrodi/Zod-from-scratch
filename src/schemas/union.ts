import type { ZodType, ZodUnion } from '../types'

import { parseUnion } from '../parse'

export const union = <Options extends Array<ZodType>>(
  options: Options
): ZodUnion<Options> => ({
  type: 'union',
  options,
  parse: (value: unknown) => parseUnion(options, value),
})
