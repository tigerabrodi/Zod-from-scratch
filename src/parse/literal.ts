export const parseLiteral = <Literal extends string | number | boolean>(
  value: unknown,
  literal: Literal
): Literal => {
  if (value !== literal) {
    throw new Error(`Expected ${literal} but got ${value}`)
  }

  return value as Literal
}

export const parseOptionalLiteral = <Literal extends string | number | boolean>(
  value: unknown,
  literal: Literal
): Literal | undefined => {
  if (value === undefined) {
    return undefined
  }

  return parseLiteral(value, literal)
}

export const parseNullableLiteral = <Literal extends string | number | boolean>(
  value: unknown,
  literal: Literal
): Literal | null => {
  if (value === null) {
    return null
  }

  return parseLiteral(value, literal)
}
