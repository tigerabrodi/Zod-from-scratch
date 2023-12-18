export function parseEnum<Enum extends Array<string>>(
  values: Enum,
  value: unknown
): Enum[number] {
  if (typeof value !== 'string') {
    throw new Error(`Expected a string, got ${value}`)
  }

  if (!values.includes(value)) {
    throw new Error(`Expected one of ${values.join(', ')}, got ${value}`)
  }

  return value as Enum[number]
}

export function parseOptionalEnum<Enum extends Array<string>>(
  values: Enum,
  value: unknown
): Enum[number] | undefined | null {
  if (value === undefined || value === null) {
    return value
  }

  return parseEnum(values, value)
}
