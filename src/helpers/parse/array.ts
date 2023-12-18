import type { ZodType, Infer } from '../../zod-types'

export function parseArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<Infer<Type>> {
  if (!Array.isArray(value)) throw new Error('Invalid type, not an array')
  value.forEach((v) => element.parse(v))
  return value
}

export function parseOptionalArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<Infer<Type>> | undefined | null {
  if (value === undefined || value === null) {
    return value
  }

  return parseArray(element, value)
}

export function parseNullableArray<Type extends ZodType>(
  element: Type,
  value: unknown
): Array<Infer<Type>> | null {
  if (value === null) {
    return value
  }

  return parseArray(element, value)
}
