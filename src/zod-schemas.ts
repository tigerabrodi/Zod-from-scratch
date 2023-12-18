import type {
  ZodArray,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodType,
  ZodUnknown,
} from './zod-types'

import {
  parseArray,
  parseNullableArray,
  parseNullableNumber,
  parseNumber,
  parseObject,
  parseOptionalArray,
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
})

export const z = {
  string,
  number,
  unknown,
  array,
  object,
}
