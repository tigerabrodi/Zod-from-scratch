import type {
  DiscriminatedUnionOption,
  ZodDiscriminatedUnion,
  ZodLiteral,
  ZodObject,
} from '../types'

import { parseDiscriminatedUnion } from '../parse'

export const discriminatedUnion = <
  Discriminator extends string,
  Options extends Array<
    ZodObject<DiscriminatedUnionOption<Discriminator, ZodLiteral<string>>>
  >
>(
  key: Discriminator,
  options: Options
): ZodDiscriminatedUnion<Discriminator, Options> => ({
  type: 'discriminated-union',
  discriminator: key,
  options,
  parse: (value: unknown) => parseDiscriminatedUnion(key, options, value),
})
