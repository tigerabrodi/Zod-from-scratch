import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

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

  it('should throw an error for a missing field', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
    })

    expect(() => personSchema.parse({ name: 'Alice' })).toThrow(
      'Missing field age'
    )
  })

  it('should handle nested objects', () => {
    const personSchema = z.object({
      name: z.string(),
      age: z.number(),
      address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.number(),
      }),
    })

    expect(
      personSchema.parse({
        name: 'Alice',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'NY',
          zip: 12345,
        },
      })
    ).toEqual({
      name: 'Alice',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        zip: 12345,
      },
    })
  })

  it('should handle optional objects', () => {
    const personSchema = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .optional()

    expect(personSchema.parse(undefined)).toBeUndefined()

    expect(() => personSchema.parse(null)).toThrow('Not an object')
  })

  it('should handle optional fields', () => {
    const personSchema = z.object({
      name: z.string(),
      optionalAge: z.number().optional(),
      optionalName: z.string().optional(),
      optionalArray: z.array(z.string()).optional(),
    })

    expect(
      personSchema.parse({
        name: 'Alice',
      })
    ).toEqual({
      name: 'Alice',
    })
  })

  it('should handle nullable objects', () => {
    const personSchema = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .nullable()

    expect(personSchema.parse(null)).toBeNull()

    expect(() => personSchema.parse(undefined)).toThrow('Not an object')
  })
})
