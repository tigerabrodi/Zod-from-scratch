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
  discriminator: Discriminator,
  options: Options,
  value: unknown
): Infer<Options[number]> => {
  if (typeof value !== 'object' || !value) {
    throw new Error('Value must be an object')
  }

  // necessary so TypeScript knows that value is an object with string keys so we can check for the discriminator key
  const valueAsObject = value as Record<string, unknown>

  if (!(discriminator in valueAsObject)) {
    throw new Error(`Value does not have the key "${discriminator}"`)
  }

  if (typeof valueAsObject[discriminator] !== 'string') {
    throw new Error(`Value's key type is not a string`)
  }

  const hasAnyOptionsTheDiscriminatorValue = options.some(
    (option) =>
      option.fields[discriminator].value === valueAsObject[discriminator]
  )

  if (!hasAnyOptionsTheDiscriminatorValue) {
    throw new Error(
      `Value's key type is a string, but it does not match any of the options`
    )
  }

  const option = options.find(
    (option) =>
      option.fields[discriminator].value === valueAsObject[discriminator]
  ) as ZodObject<DiscriminatedUnionOption<Discriminator, ZodLiteral<string>>>

  for (const key in option.fields) {
    // skip the discriminator key
    if (key === discriminator) {
      continue
    }

    const field = option.fields[key]

    try {
      // try to parse the value with matching key in schema
      field.parse(valueAsObject[key])
    } catch (error) {
      throw new Error(`Value's key "${key}" failed to parse: ${field.type}`)
    }
  }

  return valueAsObject as Infer<Options[number]>
}
