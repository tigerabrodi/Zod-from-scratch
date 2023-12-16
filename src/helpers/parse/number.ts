export function parseNumber(value: unknown): number {
  if (typeof value !== 'number') throw new Error('Invalid type, not a number')
  return value
}

export function parseOptionalNumber(value: unknown): number | undefined | null {
  if (value === undefined || value === null) {
    return value
  }

  return parseNumber(value)
}
