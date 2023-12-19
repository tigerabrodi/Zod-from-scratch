import type {
  DiscriminatedUnionOption,
  Infer,
  ZodLiteral,
  ZodObject,
} from '../types'

export const parseDiscriminatedUnion = <
  Discriminator extends string,
  Options extends Array<
    ZodObject<DiscriminatedUnionOption<Discriminator, ZodLiteral<string>>>
  >
>(
  key: Discriminator,
  options: Options,
  value: unknown
): Infer<Options[number]> => {
  // 1. value is NOT object, or is undefined or null, then error
  if (typeof value !== 'object' || !value) {
    throw new Error('Value must be an object')
  }

  // 2. value is object, but does not have the key, then error because it cannot be discriminated
  if (!(key in value)) {
    throw new Error(`Value does not have the key "${key}"`)
  }

  // 3. value is object, and has the key, but the value of the key is not a string, then error because it cannot be discriminated

  // 4. value is object, and has the key, and the value of the key is a string, but it does not match any of the options, then error because it cannot be discriminated

  // 5. value is object, and has the key, and the value of the key is a string, and it matches one of the options, then parse the option
}
