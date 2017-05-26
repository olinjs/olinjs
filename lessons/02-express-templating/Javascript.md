# Lesson 1.5 - JavaScript

## Goals
After this class you should:
- Understand how JavaScript relates to languages you already know
- See the quirks of JavaScript
- Understand the basics of JavaScript on a deeper level

### Atwood's Law: JavaScript is Everywhere

>Any application that can be written in JavaScript, will eventually be written in JavaScript.

[Jeff Atwood](http://blog.codinghorror.com/the-principle-of-least-power/)

## The Language

Luckily, you're probably already familiar with a language similar to JavaScript. Things like variable assignment,function definition, and control flow aren't much different from Python. We'll get into the differences later.

Type `node` in your command line to bring up the Node JavaScript REPL (read-evaluate-print-loop).

### Variable Assignment

```node
> var x = 5
undefined
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
> '5' == 5
true
> ' ' == 0
true
```

This happens because the `==` operator performs what's known as "type coercion", or implicit type conversion. If the variables being compared have different types, JavaScript will convert one to the type of the other before comparing them.

The `===` operator is also known as "identically equal" or "strict equals". It doesn't perform type coercion, so variables of different types will not be reported equal.

```node
> '5' === 5
false
> ' ' === 0
false
```

Usually, you're expecting this behavior. If in doubt, use `===` (triple-equals).

##### Checking for inequality

JavaScript also has `!=` and `!==`. All the same rules apply — `!==` is generally safer.

## Control Flow

JavaScript's control flow will be familiar to Python users, with largely syntactical differences. The keywords `break` and `continue` are unchanged.

### Conditionals

```node
if (x === 5) {

}
else if () {

}
else {
	//
}
```

### Iteration

#### For loop

For loops will run a block of code a certain number of times, based on the conditions in the declaration. There are two ways to declare a for loop, each with its ideal use case.

##### For

This is the basic for loop syntax:

```node
for (initialization; condition; final-expression) {
	statement
}
```

The `initialization` declares the variable that will be used to determine whether or not the `statement` should execute again each time the loop runs. The `condition` is evaluated before the loop runs each time — if it evalutes to `true`, the loop runs; otherwise, it stops. The `final-expression` is just code that runs after each iteration of the loop. In practice, for loop declarations look something like this:

```node
for (var i = start; i < end; i++) {
	...
}
```

This loop reads

>The loop will start with the iterator `i` equal to `start` and run while `i` is less than `end`, and `i` will increase by `1` after each iteration.

##### For...in

If the loop iterates through an array or object, you can also use this shorthand:

```node
for (var index in array) {
	var element = array[index]
	...
}

for (var key in object) {
	var value = object[key]
	...
}
```

Note that the order of iteration is not guaranteed with this syntax. If you use libraries which modify the prototype (more on this later) of base types, you may encounter strange behaviors where you iterate over functions in addition to the elements of the object you expect. These behaviors can be avoided using following syntax:

```node
array.forEach(function(element) {
	console.log(element);
	...
};

Object.keys(object).forEach(function(key) {
	var value = object[key];
	...
};
```

#### While loop

A while loop is useful if the amount of times the loop should run is not known before it runs (for example, it should run until a conditional evaluates to `false`).

```node
while (condition) {
	statement
}
```

#### Do...while loop

The do...while loop is simply a while loop where the `statement` is guaranteed to run at least once.

```node
do {
	statement
} while (condition);
```

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
> Number('5.6789123456789123456789')
5.678912345678913
```

The `Number()` typecast supports strings and floating point numbers (and even rounds!). No need to write your own number parsing code!

The next behavior is arguably worse than throwing an error, but also cool: You *can* do string multiplication in JavaScript!

```node
> '3' * '4'
12
```

Not really, though. It's a number now.

```node
> typeof('3' * '4')
'number'
```

String addition works as expected.

```node
> 'a' + 'b'
'ab'
> '5' + '5'
'55'
> '5' - '5'
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
	return 1;
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
console.log(func1)
console.log(func1())
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
	return 1;
};
```

The above example wouldn't have acted *quite* the same, though, which brings us to what makes JavaScript functions so special.

### Functions are Objects

The print statements above hinted at this: in JavaScript, functions can be stored in variables and passed around to be executed elsewhere. This ability demonstrates that functions are objects. So something like this is possible:

###### functions.js
```node
function func1() {
	var func2 = function() {
		return 2
	};
	return func2;
}
```

What will happen when we call `func1`?

###### functions.js
```node
...
console.log(func1());
```

```bash
$ node functions.js
[Function]
```

The function `func1` is a named function that returns the variable `func2`. We set `func2` equal to a function definition without a name — the function on the right hand side of this assignment is known as an **anonymous function**.

So, `func1` returns a variable containing an anonymous function which returns `2`. How do we call the returned anonymous function?

###### functions.js
```node
...
console.log(func1()());
```

```bash
$ node functions.js
2
```

This is totally legal. It might help to break down the expression we just printed:

```node
func1()(); // first, func1 is called and we will immediately call the returned function
func2(); // it returns func2
(function() { return 2; })(); // func2 holds an anonymous function
2 // the anonymous function (stored in func2, the output of func1) is called and returns 2
```

## Closures

When a function object is declared, it has access to the variables in the scope in which it was declared.

###### closures.js
```node
var multSum = function(x, y) {
	var mult = function() {
		return x*y
	}
	return mult() + x + y
}

console.log(multSum(5, 6)) // 5*6 + 5 + 6
```

```bash
$ node closures.js
41
```

The function `mult` declared inside `multSum` has access to the variables `x` and `y`, because they are in the scope in which `mult` was declared. Here, `mult` is a closure — it encompasses not just the function itself, but also the scope in which it was declared (the outer scope), and the global scope, of course (all functions have access to the global scope).

Closures are often seen in practice as callbacks, explained next. The Mozilla Developer Network offers [a more in-depth explanation of closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures).

## Callbacks

Function objects let us pass around pieces of code that can be run at arbitrary times.

Here's a really common situation: A client application requests data from a URL, and wants to process the data when it arrives. There's no way to know how long it will take the data to arrive, and even if there was, we wouldn't want to just block execution and wait until we got the data. This would be **synchronous execution**, where code is executed one line at a time, in order. It would be great if we could request the data and go about our business until we received it — then we could run the code that depends on the data. **Asynchronous execution**, where code is executed out of order (often in response to events), allows this. Luckily, this behavior is the norm in JavaScript.

**Callbacks** are functions that we provide to be run when an event occurs. Here's an example with real code:

```node
$.get(url, success);
```

You might be familiar with dot syntax from Python — if you're not, we'll cover it soon. The `$` is a stand-in for jQuery, a ubiquitous client-side JavaScript library that adds a lot of useful functionality (like better DOM/CSS manipulation and asynchronous request functions) to JavaScript. `jQuery.get` (or `$.get`) is a method that requests data from the provided `url`.

The second argument is a success callback — it is a function that will be called, and passed the response data as an argument, if the request is successful. We could call `$.get` like this:

```node
$.get('www.some.url', function(data) {
	console.log(data);
	console.log('Request was successful!');
});
```

`success` could also be a variable containing an anonymous function:

```node
var handleSuccess = function(data) {
	console.log(data);
	console.log('Request was successful!');
};

$.get('www.some.url', handleSuccess);
```

It could even be a function declared somewhere else entirely, like this.

```node
function globalSuccessHandler(data) {
	...
}
...
$.get('www.some.url', globalSuccessHandler);
```

## Objects

Objects in JavaScript are simple key-value stores, which you may know from Python as **dictionaries**.

We can create an empty object like this:

```node
> var obj = {}
undefined
```

Properties can be added and accessed with dot syntax.

```node
> obj.color = 'blue'
'blue'
> obj.color
'blue'
```

Bracket syntax lets us use variables as keys.

```node
> var colorKey = 'color'
undefined
> obj[colorKey]
'blue'
```

Dot syntax is more concise than bracket syntax, so it's preferable unless bracket syntax is necessary (like if your key has a space, for some reason):

```node
> obj['another color'] = 'red'
'red'
> obj['another color']
'red'
> obj
{ color: 'blue',
'another color': 'red' }
```

Printing `obj` shows exactly how to declare objects that aren't empty. Objects can contain any variable type, including functions and other objects:

```node
> var obj = {
... aBool: true,
... aString: 'string',
... aNum: 5.6,
... aFunc: function() { return 6; },
... anObj: { key: 'nesting is pretty great' }
... }
undefined
```

Properties can be treated like you might expect:

```node
> obj.aFunc
[Function]
> obj.aFunc()
6
> obj.anObj.key
'nesting is pretty great'
```

JavaScript objects are versatile and ubiquitous — you'll see them everywhere. This brings us to the next section.

### Arrays

Arrays in JavaScript are also objects, which is why we covered objects first. Declare an array like this:

```node
> var arr = []
undefined
```

Or a filled one like this:

```node
> var array = [1, 2, 3, 4]
undefined
```

Arrays can contain any type, and need not contain variables of the same type.

```node
> var jsArray = [true, 'string', function() { return 'why would anyone do this'; }]
undefined
> jsArray[2]()
'why would anyone do this'
```

### Array Methods

#### Array length

Retrieve the length of an array with `Array.length`:

```node
> array
[ 1, 2, 3, 4 ]
> array.length
4
```

#### Appending and Prepending

Use `push` to append an element to an array:

```node
> array.push(5)
5
> array
[ 1, 2, 3, 4, 5 ]
```

And `pop` to remove the last element (`pop` returns the last element):

```node
> array.pop()
5
> array
[ 1, 2, 3, 4 ]
```

Conversely, use `unshift` to prepend an element:

```node
> array.unshift(0)
5
> array
[ 0, 1, 2, 3, 4 ]
```

And `shift` to remove the first element (`shift` returns the first element):

```node
> array.shift()
0
> array
[ 1, 2, 3, 4 ]
```

#### Further Reading

There are more built-in array methods, but we'll cover them later. JavaScript arrays generally act like Python arrays.

Two good sources for documentation are [w3schools](http://www.w3schools.com/jsref/jsref_obj_array.asp) (easier to follow) and [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (official and more complete).

### Weird JavaScript Array Behavior

Since JavaScript arrays are objects, they kind of act like them:

```node
> jsArray
[ true, 'string', [Function] ]
> jsArray.question = 'Am I an object?'
'Am I an object?'
> jsArray
[ true,
'string',
[Function],
question: 'Am I an object?' ]
```

That string was actually stored as a property, not an element of the array:

```node
> jsArray[3]
undefined
> jsArray.question
'Am I an object?'
```

Arrays are, in fact, objects, but they're special. When you index an array with a non-negative integer, it acts like an array. Indexing an object similarly just casts the integer to a string and adds it as a key.

```node
> typeof(jsArray)
'object'
> jsArray instanceof Array // Array is a type of object
true
> typeof(obj)
'object'
> obj[4] = 6
6
> obj
{ '4': 6,
aBool: true,
aString: 'string',
aNum: 5.6,
aFunc: [Function],
anObj: { key: 'nesting' } }
```

So if you index an array with an invalid number, it won't throw an error.

```node
> jsArray[-1] = -2
-2
> jsArray[3.141] = 'pi'
'pi'
> jsArray[6] = 5
5
> jsArray
[ true,
'string',
[Function],
,
,
,
5,
question: 'Am I an object?',
'-1': -2,
'3.141': 'pi' ]
```

The moral of the story is that JavaScript is remarkably robust, whether you like it or not. It will run happily where other languages would choke, so it often falls to you to write good code that will prevent weird things from happening. Leverage the flexibility of JavaScript to write elegant code — don't let it bite you.

# Lesson 1.5 In-Class Exercises
(As before, we’re not expecting you to finish all of these activities! Pick the ones which are interesting and challenging to you, and feel free to work with the people around you.)

## JavaScript Concepts:
- Break into groups of ~4 members. Each member is in charge of finding out about a specific javascript concept and writing a small [jsfiddle](https://jsfiddle.net/) that demonstrates it.
  - Come back together and give quick whiteboard talks within your group -- teach the rest of the group about your concept.
  - Concepts:
    - First-Class and Higher Order Functions
    - Prototypes/Inheritance
    - Bind, Apply, Call
    - Closures

## Event Listeners:
- Much of web development is learning to react to events. As a first foray into event handling, write a small jsfiddle [like this](https://jsfiddle.net/too7t5dd/) that creates a simple html element and responds to an event of your choice. A list of possible events is available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

## Functional Programming:
- Part of the power of JavaScript is that it is supports imperative (like C), object oriented (like C++ or Java), and functional (like OCaml or Lisp) programming paradigms. Its likely you've run into the first two through previous software classes, but if you are new to functional programming now is a great time to get an introduction
- Read one or more of the following (in increasing order of read time):
  - [A Practical Introduction To Functional Programming](https://medium.com/@riteshkeswani/a-practical-introduction-to-functional-programming-javascript-ba5bee2369c2#.z4n0g8oew)
  - [Introduction to Functional Javascript](https://medium.com/functional-javascript/introduction-to-functional-javascript-45a9dca6c64a#.nq16t3bdp)
  - [Eloquent Javascript 1st Ed Ch 6: Functional Programming](http://eloquentjavascript.net/1st_edition/chapter6.html)
- Use what you learned (do some of the following):
  - Discuss what you learned with a partner
  - Come up with a simple task such as displaying the current time. Write two small jsfiddles to complete the task: one in an object-oriented fashion, the other in a functional one.
  - Read through and understand the documentation for some of JavaScript's functional tools (for instance, `Array.prototype.map()` and `Array.prototype.reduce()`) and practice using them in jsfiddle.

## Debugging Exercises
- Try some or all of these exercises (Please fork the jsfiddles before editing them)
  - [Exercise 1](https://jsfiddle.net/q0mj0arL/1/)
  - [Exercise 2](https://jsfiddle.net/tr6Lvu2t/1/)
  - [Exercise 3](https://jsfiddle.net/1mfruLeq/1/)
- With a partner or small group...
	- Write a similar simple debugging exercise
	- Exchange them

# Further Reading
## Node Beginner Book
Read the Node Beginner Book (in `Public/+Courses/Olinjs16/`) up to page 58 (the section marked **Handling file uploads** — the methods used there are old and no longer relevant). This resource ties together a lot of what we covered in class 1 by implementing a basic web server in Node. You'll learn how Node handles browser requests — and how Node is unique — while flexing your newly acquired JavaScript muscle. You should follow along by writing and running the code examples given.

## Style Guide
Read the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript/tree/es5-deprecated/es5). Try to incorporate these styles into your work in this class. While the current scripting language standard is ES6, we will be using ES5 styling for the majority of the course.

## More Reading
This is a fun, well-written article on how naming conventions affect the way we think and code: [Execution in the Kingdom of Nouns](http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html).
