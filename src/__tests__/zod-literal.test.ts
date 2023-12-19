import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Zod literal Schema', () => {
  it('should validate a literal', () => {
    const stringLiteralSchema = z.literal('a')
    expect(stringLiteralSchema.parse('a')).toEqual('a')
    expect(stringLiteralSchema.value).toBe('a')

    const numberLiteralSchema = z.literal(1)
    expect(numberLiteralSchema.parse(1)).toEqual(1)
    expect(numberLiteralSchema.value).toBe(1)

    const booleanLiteralSchema = z.literal(true)
    expect(booleanLiteralSchema.parse(true)).toEqual(true)
    expect(booleanLiteralSchema.value).toBe(true)
  })

  it("should throw an error if the literal doesn't match", () => {
    const stringLiteralSchema = z.literal('a')
    expect(() => stringLiteralSchema.parse('b')).toThrow('Expected a but got b')

    const numberLiteralSchema = z.literal(1)
    expect(() => numberLiteralSchema.parse(2)).toThrow('Expected 1 but got 2')

    const booleanLiteralSchema = z.literal(true)
    expect(() => booleanLiteralSchema.parse(false)).toThrow(
      'Expected true but got false'
    )
  })
})
