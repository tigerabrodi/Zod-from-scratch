export function parseString(value: unknown): string {
  if (typeof value !== 'string') throw new Error('Invalid type, not a string')
  return value
}

export function parseOptionalString(value: unknown): string | undefined | null {
  if (value === undefined || value === null) {
    return value
  }

  return parseString(value)
}

export function parseNullableString(value: unknown): string | null {
  if (value === null) {
    return value
  }

  return parseString(value)
}
