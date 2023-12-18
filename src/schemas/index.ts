import { array } from './array'
import { Enum } from './enum'
import { number } from './number'
import { object } from './object'
import { string } from './string'
import { unknown } from './unknown'

export const z = {
  string,
  number,
  unknown,
  array,
  object,
  enum: Enum,
} as const
