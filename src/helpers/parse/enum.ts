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
): Enum[number] | undefined {
  if (value === undefined) {
    return value
  }

  return parseEnum(values, value)
}

export function parseNullableEnum<Enum extends Array<string>>(
  values: Enum,
  value: unknown
): Enum[number] | null {
  if (value === null) {
    return value
  }

  return parseEnum(values, value)
}
