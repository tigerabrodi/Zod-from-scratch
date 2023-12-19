# Zod from scratch

Building Zod from scratch to learn how it works under the hood.

Started as a conversation with a friend to wait wtf how does it actually work? :joy:

Doing it with TDD. :smile:

We'll see how far I take it lmao.

## Todo

Overall made some good progress.

[x] Basic types.
[x] Handle nested objects and arrays.
[x] Optional and nullable types.
[x] Enum Types
[x] Union Types
[x] Literal strings
[x] Discriminated Union

## Run it locally

Clone it.

Install deps `npm i`.

Run test `npm test`.

## Buggy

You may come across `Type instantiation is excessively deep and possibly infinite.`.

The way I've built Zod here is a "naive" approach.

It's usable but to fully satisfy the TypeScript system, you would have to build it differently from scratch.

What you'd have to keep in mind:

- Avoid deep nesting
- Limit recursion
- Be careful with union types: large and complex unions can be difficult for TypeScript to process
- Break down types to smaller types, simplifying it for TypeScript
- Compose types

## Discriminated Union Type

This is a bit tricky to understand.

```ts
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
```

`Discriminator` is a single string.

When you use `K in Discriminator`, you could imagine it loops over every character. Because when doing mapped types, `in` loops over union types. It's common to see `K in keyof Obj`.

However, `K in Discriminator` can be visualized as `K in "example"` where the type is `"example"`. Because this union type we could say only has one string, the loop happens once.

As for `DiscriminatorType extends ZodLiteral<string>`, I didn't include it initially. But TypeScript started to complain when using the zod object. It had a difficult time understanding the types. The solution there is to use `extends` with a generic to help TypeScript narrow down the type and process it.
