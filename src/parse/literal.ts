export const parseLiteral = <Literal extends string | number | boolean>(
  value: unknown,
  literal: Literal
): Literal => {
  if (value !== literal) {
    throw new Error(`Expected ${literal} but got ${value}`)
  }

  return value as Literal
}
