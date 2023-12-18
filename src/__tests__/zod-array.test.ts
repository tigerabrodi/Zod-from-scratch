import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Array Schema', () => {
  it('should validate an array of numbers', () => {
    const numArray = z.array(z.number())
    expect(numArray.parse([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should throw an error for a non-array', () => {
    const numArray = z.array(z.number())
    expect(() => numArray.parse('not an array')).toThrow(
      'Invalid type, not an array'
    )
  })

  it('should throw an error for an array with invalid elements', () => {
    const numArray = z.array(z.number())
    expect(() => numArray.parse([1, '2', 3])).toThrow(
      'Invalid type, not a number'
    )
  })

  it('should handle nested arrays', () => {
    const numArray = z.array(z.array(z.number()))
    expect(
      numArray.parse([
        [1, 2],
        [3, 4],
      ])
    ).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('should handle optional arrays', () => {
    const numArray = z.array(z.number()).optional()
    expect(numArray.parse(undefined)).toEqual(undefined)
    expect(() => numArray.parse(null)).toThrow('Invalid type, not an array')
  })

  it('should handle nullable arrays', () => {
    const numArray = z.array(z.number()).nullable()
    expect(numArray.parse(null)).toBeNull()
    expect(() => numArray.parse('not an array')).toThrow(
      'Invalid type, not an array'
    )
  })
})
