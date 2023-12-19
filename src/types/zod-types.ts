import type { Infer, InferElementType, InferZodObject } from './infer'

export type ZodType =
  | ZodUnknown
  | ZodString
  | ZodNumber
  | ZodArray<ZodType>
  | ZodObject<Record<string, ZodType>>
  | ZodOptional<ZodType>
  | ZodNullable<ZodType>
  | ZodEnum<Array<string>>
  | ZodUnion<Array<ZodType>>
  | ZodLiteral<string | number | boolean>
  | ZodDiscriminatedUnion<
      string,
      Array<
        ZodObject<
          { [K in string]: ZodLiteral<string> } & Record<string, ZodType>
        >
      >
    >

type OptionalOrNullable = 'optional' | 'nullable'

export interface ZodOptional<Type extends ZodType> {
  type: Type['type']
  isOptional: true
  parse(val: unknown): Infer<Type> | undefined
}

export interface ZodNullable<Type extends ZodType> {
  type: Type['type']
  isNullable: true
  parse(val: unknown): Infer<Type> | null
}
export interface ZodEnum<Enum extends Array<string>> {
  type: 'enum'
  values: Enum
  parse(val: unknown): Enum[number]
  enum: { [Key in Enum[number]]: Key }
  optional(): Omit<ZodOptional<ZodEnum<Enum>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodEnum<Enum>>, OptionalOrNullable>
}

export interface ZodUnknown {
  type: 'unknown'
  parse(val: unknown): unknown
}

export interface ZodString {
  type: 'string'
  parse(val: unknown): string
  optional(): Omit<ZodOptional<ZodString>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodString>, OptionalOrNullable>
}

export interface ZodNumber {
  type: 'number'
  parse(val: unknown): number
  optional(): Omit<ZodOptional<ZodNumber>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodNumber>, OptionalOrNullable>
}

export interface ZodArray<Type extends ZodType> {
  type: 'array'
  element: Type
  parse(val: unknown): Array<InferElementType<Type>>
  optional(): Omit<ZodOptional<ZodArray<Type>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodArray<Type>>, OptionalOrNullable>
}

export interface ZodObject<Type extends Record<string, ZodType>> {
  type: 'object'
  fields: Type
  parse(val: unknown): InferZodObject<ZodObject<Type>>
  optional(): Omit<ZodOptional<ZodObject<Type>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodObject<Type>>, OptionalOrNullable>
}

export interface ZodUnion<Union extends Array<ZodType>> {
  type: 'union'
  options: Union
  parse(val: unknown): Infer<Union[number]>
  optional(): Omit<ZodOptional<ZodUnion<Union>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodUnion<Union>>, OptionalOrNullable>
}

export interface ZodLiteral<Literal extends string | number | boolean> {
  type: 'literal'
  value: Literal
  parse(val: unknown): Literal
  optional(): Omit<ZodOptional<ZodLiteral<Literal>>, OptionalOrNullable>
  nullable(): Omit<ZodNullable<ZodLiteral<Literal>>, OptionalOrNullable>
}

export type DiscriminatedUnionOption<
  Discriminator extends string,
  DiscriminatorType extends ZodLiteral<string>
> = {
  [K in Discriminator]: DiscriminatorType
} & Record<string, ZodType>

export interface ZodDiscriminatedUnion<
  Discriminator extends string,
  Union extends Array<
    ZodObject<DiscriminatedUnionOption<Discriminator, ZodLiteral<string>>>
  >
> {
  type: 'discriminated-union'
  discriminator: Discriminator
  options: Union
  parse(val: unknown): Infer<Union[number]>
}
