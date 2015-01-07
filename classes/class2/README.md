#JavaScript

## JavaScript is Everywhere

### Atwood's Law
	
>Any application that can be written in JavaScript, will eventually be written in JavaScript

[Jeff Atwood](http://blog.codinghorror.com/the-principle-of-least-power/)

## The Language

Luckily, you're probably already familiar with a language similar to JavaScript. Things like variable assignment,function definition, and control flow aren't much different from Python. We'll get into the differences later.

Type `node` in your command line to bring up the Node JavaScript REPL (read-evaluate-print-loop).

### Variable Assignment

```node
> var x = 5

> x
5
```

For the rest of this lesson (unless otherwise specified), `x` will be equal to the number `5` at the start of every example.

Variable assignments in JavaScript start with `var`. If you omit `var`, the variable will be *implicitly global*. This is ***very bad*** -- almost worse than the program just crashing with an error message. We'll go into why later.

### Operators

JavaScript operators are all the same as Python, except `**` doesn't exponentiate.

```node
> 6 + 6
12
> x += 6
11
> x > 5
true
> 6 ** 6
...
```

The `...` means the REPL is waiting for a certain input. In this case, it just means it's confused. Press `Ctrl+C` to get back to the prompt.

#### Checking for equality

Here's an important corollary to what I just claimed: JavaScript has two ways to check for equality: `==` and `===`.

Double-equals does things you might expect, like this:

```node
> 5 == 5
true
> x == 5
true
```

But it will also do things you probably won't be expecting, like this:

```node
> "5" == 5
true
> " " == 0
true
```

This happens because the `==` operator performs what's known as "type coercion", or implicit type conversion. If the variables being compared have different types, JavaScript will convert one to the type of the other before comparing them.

The `===` operator is also known as "identically equal" or "strict equals". It doesn't perform type coercion, so variables of different types will not be reported equal.

```node
> "5" === 5
false
> " " === 0
false
```

Usually, you're expecting this behavior. If in doubt, use `===` (triple-equals).

##### Checking for inequality

JavaScript also has `!=` and `!==`. All the same rules apply -- `!==` is generally safer.

## Types

JavaScript variables can have one of the following types:

- `Undefined`
- `Null`
- `Boolean`
- `String`
- `Number`
- `Object`

The types `Boolean`, `String`, `Number`, and `Object` all provide functions to convert, or cast, expressions to their type.

```node
> String(5)
'5'
> Boolean(0)
false
> Boolean(5) // any non-zero number
true
> Number("5.6789123456789123456789")
5.678912345678913
```

The `Number()` typecast supports strings and floating point numbers (and even rounds!). No need to write your own number parsing code!

The next behavior is arguably worse than breaking, but also cool: You *can* do string multiplication in JavaScript!

```node
> "3" * "4"
12
```

Not really, though. It's a number now.

```node
> typeof("3" * "4")
'number'
```

String addition works as expected.

```node
> "a" + "b"
'ab'
> "5" + "5"
'55'
> "5" - "5"
0
```

Well, anyway...

JavaScript, like Python, is dynamically typed. This means that a variable's type is determined at runtime. But since JavaScript is also very weakly typed (while Python is not), functions will usually be able to operate on arguments of the wrong type (by coercing them, for example), which means a program can fail unexpectedly long after a type-related mistake is made. In this case, error messages are usually not helpful, so the best thing to do is be careful and think ahead as you write your code.

## Functions
### Functions are Objects
### Anonymous Functions and Closures
## Explain scoping
## Callbacks
## Objects
## Prototypes