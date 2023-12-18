import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Union Schema', () => {
  it('should validate a union', () => {
    const schema = z.union([z.string(), z.number()])
    expect(schema.parse('hello')).toBe('hello')
    expect(schema.parse(123)).toBe(123)
  })

  it('should throw an error for a non-union', () => {
    const schema = z.union([z.string(), z.number()])
    expect(() => schema.parse(true)).toThrow(
      'Could not parse true as ["string","number"]'
    )
  })
})
