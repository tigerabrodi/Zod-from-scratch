import type {
  ZodArray,
  ZodEnum,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodType,
  ZodUnknown,
} from './zod-types'

import {
  parseArray,
  parseEnum,
  parseNullableArray,
  parseNullableEnum,
  parseNullableNumber,
  parseNullableObject,
  parseNullableString,
  parseNumber,
  parseObject,
  parseOptionalArray,
  parseOptionalEnum,
  parseOptionalNumber,
  parseOptionalObject,
  parseOptionalString,
  parseString,
} from './helpers'

const string = (): ZodString => ({
  type: 'string',
  parse: parseString,
  optional: () => ({
    type: 'string',
    isOptional: true,
    parse: parseOptionalString,
  }),
  nullable: () => ({
    type: 'string',
    isNullable: true,
    parse: parseNullableString,
  }),
})

const number = (): ZodNumber => ({
  type: 'number',
  parse: parseNumber,
  optional: () => ({
    type: 'number',
    isOptional: true,
    parse: parseOptionalNumber,
  }),
  nullable: () => ({
    type: 'number',
    isNullable: true,
    parse: parseNullableNumber,
  }),
})

const unknown = (): ZodUnknown => ({
  type: 'unknown',
  parse: (value: unknown) => value,
})

const array = <Type extends ZodType>(element: Type): ZodArray<Type> => ({
  type: 'array',
  element,
  parse: (value: unknown) => parseArray(element, value),
  optional: () => ({
    type: 'array',
    element,
    isOptional: true,
    parse: (value: unknown) => parseOptionalArray(element, value),
  }),

  nullable: () => ({
    type: 'array',
    element,
    isNullable: true,
    parse: (value: unknown) => parseNullableArray(element, value),
  }),
})

const object = <Type extends Record<string, ZodType>>(
  fields: Type
): ZodObject<Type> => ({
  type: 'object',
  fields,
  parse: (value: unknown) => parseObject(fields, value),
  optional: () => ({
    type: 'object',
    fields,
    isOptional: true,
    parse: (value: unknown) => parseOptionalObject(fields, value),
  }),
  nullable: () => ({
    type: 'object',
    fields,
    isNullable: true,
    parse: (value: unknown) => parseNullableObject(fields, value),
  }),
})

const Enum = <Enum extends Array<string>>(values: Enum): ZodEnum<Enum> => ({
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

export const z = {
  string,
  number,
  unknown,
  array,
  object,
  enum: Enum,
}
