import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

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

  it('should handle optional enums', () => {
    const enumSchema = z.enum(['a', 'b', 'c']).optional()
    expect(enumSchema.parse('a')).toEqual('a')
    expect(enumSchema.parse(undefined)).toEqual(undefined)
    expect(() => enumSchema.parse(null)).toThrow('Expected a string, got null')
  })

  it('should handle nullable enums', () => {
    const enumSchema = z.enum(['a', 'b', 'c']).nullable()
    expect(enumSchema.parse('a')).toEqual('a')
    expect(enumSchema.parse(null)).toEqual(null)
    expect(() => enumSchema.parse(undefined)).toThrow(
      'Expected a string, got undefined'
    )
  })

  it('should return enum object with each enum', () => {
    const enumSchema = z.enum(['a', 'b', 'c'])
    expect(enumSchema.enum).toEqual({
      a: 'a',
      b: 'b',
      c: 'c',
    })
  })
})
