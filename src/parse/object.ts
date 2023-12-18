import type { InferZodObject, ZodObject, ZodType } from '../types'

export function parseObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown
): InferZodObject<ZodObject<Type>> {
  if (typeof value !== 'object' || value == null)
    throw new Error('Not an object')

  const objectValue = value as Record<string, unknown>

  // Check that each key in `fields` is present in the `value`, and its
  // value parses by the corresponding entry in `value`
  Object.entries(fields).forEach(([key, val]) => {
    const isKeyInObjectValue = key in objectValue

    if (!isKeyInObjectValue && fields[key] && 'isOptional' in fields[key]) {
      return
    }

    if (!isKeyInObjectValue) throw new Error(`Missing field ${key}`)

    val.parse(objectValue[key])
  })

  return value as InferZodObject<ZodObject<Type>>
}

export function parseOptionalObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown
): InferZodObject<ZodObject<Type>> | undefined {
  if (value === undefined) {
    return value
  }

  return parseObject(fields, value)
}

export function parseNullableObject<Type extends Record<string, ZodType>>(
  fields: Type,
  value: unknown
): InferZodObject<ZodObject<Type>> | null {
  if (value === null) {
    return value
  }

  return parseObject(fields, value)
}
