import { it, describe, expect } from 'vitest'

import { z } from '../zod-schemas'

describe('Enum Schema', () => {
  it('should validate an enum', () => {
    const enumSchema = z.enum(['a', 'b', 'c'])
    expect(enumSchema.parse('a')).toEqual('a')
  })

  it('should throw an error if the value is not in the enum', () => {
    const enumSchema = z.enum(['a', 'b', 'c'])
    expect(() => enumSchema.parse('d')).toThrow(
      'Expected one of a, b, c, got d'
    )
  })

  it('should throw an error if the value is not a string', () => {
    const enumSchema = z.enum(['a', 'b', 'c'])
    expect(() => enumSchema.parse(1)).toThrow('Expected a string, got 1')
  })
})
