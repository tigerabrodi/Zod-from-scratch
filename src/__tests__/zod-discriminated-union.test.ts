import { it, describe, expect } from 'vitest'

import { z } from '../schemas'

describe('Discriminated union Schema', () => {
  it("throws an error if the value isn't an object", () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        lol: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        lmao: z.string(),
      }),
    ])

    expect(() => union.parse('a')).toThrow('Value must be an object')
    expect(() => union.parse(1)).toThrow('Value must be an object')
  })

  it('throws an error if value is undefined or null', () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        lol: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        lmao: z.string(),
      }),
    ])

    expect(() => union.parse(undefined)).toThrow('Value must be an object')
    expect(() => union.parse(null)).toThrow('Value must be an object')
  })

  it('throws an error if value is object, but does not have the key', () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        lol: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        lmao: z.string(),
      }),
    ])

    expect(() =>
      union.parse({
        lol: 1,
      })
    ).toThrow('Value does not have the key "type"')
  })

  it('throws an error if value is object, has the key, but the value of the key is not a string', () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        lol: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        lmao: z.string(),
      }),
    ])

    expect(() =>
      union.parse({
        type: 1,
      })
    ).toThrow(`Value's key type is not a string`)
  })

  it("throws error if key's value is a string, but it does not match any of the options", () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        lol: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        lmao: z.string(),
      }),
    ])

    expect(() =>
      union.parse({
        type: 'c',
      })
    ).toThrow(
      `Value's key type is a string, but it does not match any of the options`
    )
  })

  it('should validate a discriminated union schema', () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        a: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        b: z.string(),
      }),
    ])

    expect(union.parse({ type: 'a', a: 1 })).toEqual({ type: 'a', a: 1 })
    expect(union.parse({ type: 'b', b: '1' })).toEqual({ type: 'b', b: '1' })
  })

  it('should throw an error if a field fails to parse', () => {
    const union = z.discriminatedUnion('type', [
      z.object({
        type: z.literal('a'),
        a: z.number(),
      }),
      z.object({
        type: z.literal('b'),
        b: z.string(),
      }),
    ])

    expect(() => union.parse({ type: 'a', a: '1' })).toThrow(
      `Value's key "a" failed to parse: number`
    )
    expect(() => union.parse({ type: 'b', b: 1 })).toThrow(
      `Value's key "b" failed to parse: string`
    )
  })
})
