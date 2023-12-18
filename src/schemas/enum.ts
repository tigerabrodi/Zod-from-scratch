import type { ZodEnum } from '../types'

import { parseEnum, parseNullableEnum, parseOptionalEnum } from '../parse'

export const Enum = <Enum extends Array<string>>(
  values: Enum
): ZodEnum<Enum> => ({
  type: 'enum',
  values,
  parse: (value: unknown) => parseEnum(values, value),
  optional: () => ({
    type: 'enum',
    isOptional: true,
    values,
    parse: (value: unknown) => parseOptionalEnum(values, value),
  }),
  nullable: () => ({
    type: 'enum',
    isNullable: true,
    values,
    parse: (value: unknown) => parseNullableEnum(values, value),
  }),
  enum: values.reduce<{ [Key in Enum[number]]: Key }>(
    (accumulator, currentValue) => {
      accumulator[currentValue as Enum[number]] = currentValue
      return accumulator
    },
    {} as { [Key in Enum[number]]: Key }
  ),
})
