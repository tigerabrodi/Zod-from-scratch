import type { ZodString } from '../zod-types'

import {
  parseNullableString,
  parseOptionalString,
  parseString,
} from '../helpers'

export const string = (): ZodString => ({
  type: 'string',
  parse: parseString,
  optional: () => ({
    type: 'string',
    isOptional: true,
    parse: parseOptionalString,
  }),
  nullable: () => ({
    type: 'string',
    isNullable: true,
    parse: parseNullableString,
  }),
})
