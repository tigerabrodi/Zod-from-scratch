import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Zod literal Schema', () => {
  it('should validate a literal', () => {
    const stringLiteralSchema = z.literal('a')
    expect(stringLiteralSchema.parse('a')).toEqual('a')

    const numberLiteralSchema = z.literal(1)
    expect(numberLiteralSchema.parse(1)).toEqual(1)

    const booleanLiteralSchema = z.literal(true)
    expect(booleanLiteralSchema.parse(true)).toEqual(true)
  })
})
