#JavaScript

## JavaScript is Everywhere

### Atwood's Law

>Any application that can be written in JavaScript, will eventually be written in JavaScript.

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

Variable assignments in JavaScript start with `var`. If you omit `var`, the variable will be *implicitly global*. This is ***very bad*** — almost worse than the program just crashing with an error message. We'll go into why later.

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

The `...` means the REPL is waiting for a certain input. In this case, it just means it's confused. Press `Ctrl+C` to get back to the prompt. The way to exponentiate in JavaScript is `Math.pow`:

```node
> Math.pow(4, 2) // raise 4 to the power of 2
16
```

The [`Math` object](http://www.w3schools.com/jsref/jsref_obj_math.asp) (we'll cover objects later) has lots of other useful constants and functions.

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

JavaScript also has `!=` and `!==`. All the same rules apply — `!==` is generally safer.

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

The next behavior is arguably worse than throwing an error, but also cool: You *can* do string multiplication in JavaScript!

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

JavaScript, like Python, is dynamically typed. This means that a variable's type isn't determined until runtime. But since JavaScript is also very weakly typed (while Python is not), functions will usually be able to operate on arguments of the wrong type (by coercing them, for example), which means a program can fail unexpectedly long after a type-related mistake is made. In this case, error messages are usually not helpful, so the best thing to do is be careful and think ahead as you write your code.

## Functions

Functions make complexity manageable! JavaScript is all about functions. Let's make some.

At this point we should start putting our code in files. If you have a JavaScript file:

###### functions.js
```node
function func1() {
	return 1
}
```

You can run it like this:

```bash
$ node functions.js
```

In `functions.js`, we declare a function named `func1` that takes no arguments and returns the number `1`.

We can add to `functions.js` to learn more about `func1`.

###### functions.js
```node
...
console.log( func1 )
console.log( func1() )
```

The function `console.log` does what you might expect — it logs arguments to the console.

``` bash
$ node functions.js
[Function: func1]
1
```

The two print statements we added to `functions.js` look almost the same, but the console output shows that they're very different. The first statement prints the function object `func1` — that is, the actual *entity* that represents the function itself (the code, the arguments, the scope in which it was declared — more on scope later). Node says that `func1` is a `Function` named `func1` — nothing unexpected here.

Putting `()` next to the name of a function calls the function, so when we print `func1()` we get the return value of `func1`, which is `1`.

`()` will actually always attempt to "call" the expression to its left, treating it like a function. So you can get errors like this:

```node
> 5()
TypeError: number is not a function
```

A variable can also store a function declaration, so we could have done this instead:

```node
var func1 = function() {
	return 1
}
```

The above example wouldn't have acted *quite* the same, though, which brings us to what makes JavaScript functions so special.

### Functions are Objects

The print statements above hinted at this: in JavaScript, functions are objects. So something like this is possible:

###### functions.js
```node
function func1() {
	var func2 = function() {
		return 2
	}
	return func2
}
```

What will happen when we call `func1`?

###### functions.js
```node
...
console.log( func1() )
```

```bash
$ node functions.js
[Function]
```

The function `func1` is a named function that returns the variable `func2`. We set `func2` equal to a function definition without a name — the function on the right hand side of this assignment is known as an **anonymous function**.

So, `func1` returns an anonymous function which returns `2`. How do we get at the return value of the returned function?

###### functions.js
```node
...
console.log( func1()() )
```

```bash
$ node functions.js
2
```

This is totally legal. It might help to break down the expression we just printed:

```node
func1()() // let's add parentheses to show the order of evaluation
( func1() )() // first, func1 is called
( func2 )() // it returns func2
( function() { return 2 } )() // func2 holds an anonymous function
2 // the anonymous function is called and returns 2
```

## Callbacks

Function objects let us pass around pieces of code that can be run at arbitrary times.

Here's a really common situation: A client application requests data from a URL, and wants to process the data when it arrives. There's no way to know how long it will take the data to arrive, and even if there was, we wouldn't want to just block execution and wait until we got the data. It would be great if we could request the data and go about our business until we received it — then we could run the code that depends on the data.

That's what callbacks are for. Here's an example with real code:

```node
$.get(url, success)
```

You might be familiar with dot syntax from Python — if you're not, we'll cover it soon. The `$` is a stand-in for jQuery, a ubiquitous client-side JavaScript library that adds a lot of useful functionality (like better DOM/CSS manipulation and asynchronous request functions) to JavaScript. `jQuery.get` (or `$.get`) is a method that requests data from the provided `url`.

The second argument is a success callback — it is a function that will be called, and passed the response data as an argument, if the request is successful. We could call `$.get` like this:

```node
$.get("www.some.url", function(data) {
	console.log(data)
	console.log("Request was successful!")
})
```

`success` could also be a variable containing an anonymous function:

```node
var handleSuccess = function(data) {
	console.log(data)
	console.log("Request was successful!")
}

$.get("www.some.url", handleSuccess)
```

It could even be a function declared somewhere else entirely, like this.

```node
function globalSuccessHandler(data) {
	...
}
...
$.get("www.some.url", globalSuccessHandler)
```

### Closures
## Explain scoping
## Objects

weird array stuff
object <-> associative array

## Prototypes
