import type {
  ZodString,
  ZodType,
  ZodUnknown,
  ZodNumber,
  ZodArray,
  ZodEnum,
  ZodObject,
  ZodOptional,
  ZodUnion,
  ZodLiteral,
  ZodDiscriminatedUnion,
} from './zod-types'

export type Infer<Type extends ZodType> = Type extends ZodUnknown
  ? unknown
  : Type extends ZodString
  ? string
  : Type extends ZodNumber
  ? number
  : Type extends ZodArray<infer ElementType>
  ? Array<InferElementType<ElementType>>
  : Type extends ZodEnum<infer EnumType>
  ? EnumType[number]
  : Type extends ZodLiteral<infer LiteralType>
  ? LiteralType
  : Type extends ZodDiscriminatedUnion<infer Key, infer Options>
  ? Infer<Options[number]>
  : Type extends ZodObject<infer ObjectType>
  ? InferObject<ObjectType>
  : Type extends ZodUnion<infer Options>
  ? Infer<Options[number]>
  : Type extends ZodOptional<infer WrappedType>
  ? Infer<WrappedType> | undefined | null
  : never

// simplifying the types to avoid the error "Type instantiation is excessively deep and possibly infinite"

// Simplified type for array inference
export type InferElementType<ElementType> = ElementType extends ZodType
  ? Infer<ElementType>
  : never

// Simplified type for object inference
export type InferObject<ObjectType extends Record<string, ZodType>> = {
  [Key in keyof ObjectType]: Infer<ObjectType[Key]>
}

// Simplified type for InferZodObject
export type InferZodObject<Type extends ZodObject<Record<string, ZodType>>> =
  InferObject<Type['fields']>
