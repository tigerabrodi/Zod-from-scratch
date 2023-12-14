import { it, describe, expect } from 'vitest'

import { z } from '../zod-schemas'

describe('String Schema', () => {
  it('should validate a string', () => {
    expect(z.string().parse('hello')).toBe('hello')
  })

  it('should throw an error for a non-string', () => {
    expect(() => z.string().parse(123)).toThrow('Invalid type, not a string')
  })

  it('should handle optional strings', () => {
    expect(z.string().optional().parse(undefined)).toBeUndefined()
    expect(z.string().optional().parse(null)).toBeNull()
    expect(z.string().optional().parse('hello')).toBe('hello')
  })
})
