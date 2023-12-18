import type { Infer, ZodType } from '../types'

export const parseUnion = <Options extends Array<ZodType>>(
  options: Options,
  value: unknown
): Infer<Options[number]> => {
  for (const option of options) {
    try {
      return option.parse(value)
    } catch (error) {
      // ignore error
    }
  }

  throw new Error(
    `Could not parse ${JSON.stringify(value)} as ${JSON.stringify(
      options.map((option) => option.type)
    )}`
  )
}

export const parseOptionalUnion = <Options extends Array<ZodType>>(
  options: Options,
  value: unknown
): Infer<Options[number]> | undefined => {
  if (value === undefined) {
    return undefined
  }

  return parseUnion(options, value)
}

export const parseNullableUnion = <Options extends Array<ZodType>>(
  options: Options,
  value: unknown
): Infer<Options[number]> | null => {
  if (value === null) {
    return null
  }

  return parseUnion(options, value)
}
