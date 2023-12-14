import { it, describe, expect } from 'vitest'

import { z } from '../zod-schemas'

describe('Object Schema', () => {
  it('should validate an object', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })
    expect(personSchema.parse({ name: 'Alice', age: 30 })).toEqual({
      name: 'Alice',
      age: 30,
    })
  })

  it('should throw an error for a non-object', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })
    expect(() => personSchema.parse('not an object')).toThrow('Not an object')
  })
})
