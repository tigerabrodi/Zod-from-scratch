import type { ZodUnknown } from '../types'

export const unknown = (): ZodUnknown => ({
  type: 'unknown',
  parse: (value: unknown) => value,
})
