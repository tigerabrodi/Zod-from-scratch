import type { ZodLiteral } from '../types'

import { parseLiteral } from '../parse'

export const literal = <Literal extends string | number | boolean>(
  literal: Literal
): ZodLiteral<Literal> => ({
  type: 'literal',
  value: literal,
  parse: (value: unknown) => parseLiteral(value, literal),
})
