import type { InferElementType, ZodType } from '../types'

export function parseArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<InferElementType<Type>> {
  if (!Array.isArray(value)) throw new Error('Invalid type, not an array')
  value.forEach((v) => element.parse(v))
  return value
}

export function parseOptionalArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<InferElementType<Type>> | undefined {
  if (value === undefined) {
    return value
  }

  return parseArray(element, value)
}

export function parseNullableArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<InferElementType<Type>> | null {
  if (value === null) {
    return value
  }

  return parseArray(element, value)
}
