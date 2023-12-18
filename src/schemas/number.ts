import type { ZodNumber } from '../types'

import { parseNullableNumber, parseNumber, parseOptionalNumber } from '../parse'

export const number = (): ZodNumber => ({
  type: 'number',
  parse: parseNumber,
  optional: () => ({
    type: 'number',
    isOptional: true,
    parse: parseOptionalNumber,
  }),
  nullable: () => ({
    type: 'number',
    isNullable: true,
    parse: parseNullableNumber,
  }),
})
