import type { ZodLiteral } from '../types'

import {
  parseLiteral,
  parseNullableLiteral,
  parseOptionalLiteral,
} from '../parse'

export const literal = <Literal extends string | number | boolean>(
  literal: Literal
): ZodLiteral<Literal> => ({
  type: 'literal',
  value: literal,
  parse: (value: unknown) => parseLiteral(value, literal),
  optional: () => ({
    isOptional: true,
    type: 'literal',
    value: literal,
    parse: (value: unknown) => parseOptionalLiteral(value, literal),
  }),
  nullable: () => ({
    isNullable: true,
    type: 'literal',
    value: literal,
    parse: (value: unknown) => parseNullableLiteral(value, literal),
  }),
})
