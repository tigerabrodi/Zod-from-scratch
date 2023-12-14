import { it, describe, expect } from 'vitest'

import { z } from '../zod-schemas'

describe('Array Schema', () => {
  it('should validate an array of numbers', () => {
    const numArray = z.array(z.number())
    expect(numArray.parse([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should throw an error for a non-array', () => {
    const numArray = z.array(z.number())
    expect(() => numArray.parse('not an array')).toThrow('Invalid type')
  })
})
