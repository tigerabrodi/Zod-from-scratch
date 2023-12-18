import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Number Schema', () => {
  it('should validate a number', () => {
    expect(z.number().parse(123)).toBe(123)
  })

  it('should throw an error for a non-number', () => {
    expect(() => z.number().parse('hello')).toThrow(
      'Invalid type, not a number'
    )
  })

  it('should handle optional numbers', () => {
    expect(z.number().optional().parse(undefined)).toBeUndefined()
    expect(z.number().optional().parse(123)).toBe(123)

    expect(() => z.number().optional().parse(null)).toThrow(
      'Invalid type, not a number'
    )
  })

  it('should handle nullable numbers', () => {
    expect(z.number().nullable().parse(null)).toBeNull()
    expect(() => z.number().nullable().parse(undefined)).toThrow(
      'Invalid type, not a number'
    )
  })
})
