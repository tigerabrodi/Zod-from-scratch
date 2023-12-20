# Zod from scratch

Building Zod from scratch to learn how it works under the hood.

I started because I love using Zod and got curious about how it works.

Doing it with TDD. 😄 🔥

## Todo

Overall made some good progress. 🚀

- [x] Basic types.
- [x] Handle nested objects and arrays.
- [x] Optional and nullable types.
- [x] Enum Types
- [x] Union Types
- [x] Literal strings
- [x] Discriminated Union

## Run it locally

Clone it.

Install deps `npm i`.

Run test `npm test`.

## Testing

Built it with TDD. 💞

1. Failing test.
2. Make test pass.
3. Refactor.

It was a fun experience, such dopamine!

Plus much easier than feeling overwhelmed by all the code you need to write.

## Buggy 😅

You may come across `Type instantiation is excessively deep and possibly infinite.`.

The way I've built Zod here is a "naive" approach.

It's usable but to fully satisfy the TypeScript system, you would have to build it differently from scratch.

What you'd have to keep in mind:

- Avoid deep nesting
- Limit recursion
- Be careful with union types: large and complex unions can be difficult for TypeScript to process
- Break down types to smaller types, simplifying it for TypeScript
- Compose types

## Interfaces are lazy, Types are eager 😱

Why mix interfaces and types, and not simply stick with types?

I'm a fan of sticking with types for consistency. However, here interfaces are a necessity.

No, it is not because of declaration merging that interfaces offer.

### Types -> eager evaluation

When TypeScript encounters a type alias (type), it tries to resolve it immediately. This means the type is fully expanded as soon as it's defined. "Fully expanded" is like giving your friend all the pieces of the puzzle at once. TypeScript immediately tries to see the whole picture (the entire structure of the type) as soon as you define it.

This can lead to issues with recursive types because TypeScript will keep trying to resolve them endlessly, leading to circular reference errors.

### Interfaces -> lazy evaluation

Interfaces in TypeScript are lazily evaluated. This means they are not fully expanded until they are actually used. This lazy behavior allows TypeScript to handle recursive structures more gracefully, as it doesn't try to expand them immediately upon definition.

### Example

Using type, this would result in the error `Type alias 'BoxedString' circularly references itself.`:

```ts
type Boxed<T> = { value: T }

type BoxedString = Boxed<BoxedString> | string
```

Using interface, no errors!

```ts
interface Boxed<T> {
  value: T
}

type BoxedString = Boxed<BoxedString> | string
```

### Use case

If you're building libraries, sticking to interfaces is ideal:

- Declaration merging is useful if someone wants to extend the definitions of your library.
- You will likely deal with recursive structures (depends on the complexity)

You will still use type aliases where interfaces aren't possible such as union types.

If you're not building a library, then simply stick to type aliases. Till you encounter the circular error I guess lol

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
