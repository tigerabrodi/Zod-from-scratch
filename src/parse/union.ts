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
