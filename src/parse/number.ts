export function parseNumber(value: unknown): number {
  if (typeof value !== 'number') throw new Error('Invalid type, not a number')
  return value
}

export function parseOptionalNumber(value: unknown): number | undefined {
  if (value === undefined) {
    return value
  }

  return parseNumber(value)
}

export function parseNullableNumber(value: unknown): number | null {
  if (value === null) {
    return value
  }

  return parseNumber(value)
}
