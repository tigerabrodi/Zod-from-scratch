import type { ZodUnknown } from '../zod-types'

export const unknown = (): ZodUnknown => ({
  type: 'unknown',
  parse: (value: unknown) => value,
})
