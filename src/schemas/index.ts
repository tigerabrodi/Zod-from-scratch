import { array } from './array'
import { Enum } from './enum'
import { number } from './number'
import { object } from './object'
import { string } from './string'
import { union } from './union'
import { unknown } from './unknown'

export const z = {
  string,
  number,
  unknown,
  array,
  object,
  union,
  enum: Enum,
} as const
