# Deep Dive 2: Express Routing and Middleware

This document is largely going to be a retelling of the Express [documentation for middleware](http://expressjs.com/guide/using-middleware.html), so feel free to read through that page first and then come back here for a more in-depth explanation.

## What is middlewware?
One common pitfall node beginners often run into when learning Express through modifying boilerplate code is a fundamental lack of understanding of what middleware is (and it totally didn't help that older version of Express had most of it built-in).
There's lots of talk of it in tutorials, but across the board they almost always neglect to explain what it is, assuming the reader already knows.
Thankfully, the Express documentation has a plain explanation that's easy to understand:

> Middleware is a function with access to the request object (req), the response object (res), and the next middleware in line in the request-response cycle of an Express application, commonly denoted by a variable named next.
> Middleware can:
>
> - Execute any code.
> - Make changes to the request and the response objects.
> - End the request-response cycle.
> - Call the next middleware in the stack.

*Middleware is a function.*
It's so simple, and at the same time very powerful.
All of the middleware you `app.use()`?
Just a function.
The application routes you specify in `app.get()` and `app.post()`, just functions, and therefore middleware!
This leads us to our next commonly missed point by node beginners:

## Your Application is an Array of middleware
We've touched on this point before in Olin.js, but only briefly, and it certainly bears repeating.
**Your application is just a list of functions being executed sequentially.**

<!-- NOTE: The following links are totally liable to
    be outdated in the not-too distant future -->
Let's prove it to you by tearing into [Express's source code](https://github.com/strongloop/express).
When you specify routes through `app.use()` and `app.get()`, the order in which you do so does matter.
Express keeps track of these routes with an array, see [here's the source code for it](https://github.com/strongloop/express/blob/master/lib/router/index.js#L46).
You can see that when you call `.use()`, either on an `express.Router()` or `express()` object, [it's really just `push`-ing your function onto the end of that array](https://github.com/strongloop/express/blob/master/lib/router/index.js#L460).
Then, when the server takes in a request, [it iterates over that array](https://github.com/strongloop/express/blob/master/lib/router/index.js#L205) for all of the functions that match the path requested, [and calls them](https://github.com/strongloop/express/blob/master/lib/router/index.js#L267).

## Let's Make Some Middleware!
Now that you've just learned you're already an expert in writing middleware, let's write our own separate module that can be used as middleware in any application.
Let's keep it simple and make a stripped-down version of Passport's `LocalStrategy`, handling some `/login` and `/logout` routes.
