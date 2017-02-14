## Table of Contents
<!-- MarkdownTOC -->

- [Lesson 8 - Testing and Task Running](#lesson-8---testing-and-task-running)
  - [Testing Philosophy](#testing-philosophy)
  - [Types of Tests](#types-of-tests)
  - [Test Driven Development \(TDD\)](#test-driven-development-tdd)
  - [Testing Fundamentals](#testing-fundamentals)
  - [Server-Side Testing with Mocha and Chai](#server-side-testing-with-mocha-and-chai)
  - [Client-Side Testing with Karma](#client-side-testing-with-karma)
  - [Running Tasks with `npm`](#running-tasks-with-npm)
- [Lesson 8 In-Class Exercises](#lesson-8-in-class-exercises)
- [Before Class 9](#before-class-9)

<!-- /MarkdownTOC -->


#Lesson 8 - Testing and Task Running

## Testing Philosophy
###What is Testing?

As you might expect, testing involves observing components of a system in use to ensure that they are working as they should or, if they aren't working, to help diagnose where they're failing and why.

Most of you have probably have heard of software testing before -- you might be thinking of lots of print statements to see if things are equal, and a process which just takes a lot of time and isn't that important. Not so.

###Why Test?

Obviously testing helps catch bugs and make sure your code works, but it also provides other benefits in terms of overall code quality. Having a good test suite for a project increases maintainability as it becomes harder to introduce new bugs in new versions without breaking tests. Additionally, high quality code tends to be very well encapsulated, and well encapsulated code tends to be easier to test. That said, when you sit down to test something and realize that the test is going to be complicated to write, consider first refactoring the code you are testing so you end up with several tests that are all easier to write, and better code in general as a result.

##Types of Tests

Tests are generally classified according to how much code they target. The less code a test targets, the easier it is to diagnose what's going wrong when the test fails and the easier the test will probably be to maintain.

- **Unit tests** target small, isolated pieces of code -- for instance, functions. A unit test might check that a function with a return statement returns the correct value, or that a function which modifies a list does so correctly.
- **Integration tests** combine isolated units of code to ensure they work together correctly. An integration test might save a record to a database, then read it back and check that it's unchanged.
- **End-to-end tests** (also known as **system tests**) for a web app simulate user interactions with the app and check that it's working as it should. An end-to-end test might fill out a login form, click "Sign In", and verify that the URL has changed to indicate that the user is signed in.

A common philosophy (check out [this blog post from Google](http://googletesting.blogspot.com/2015/04/just-say-no-to-more-end-to-end-tests.html)) suggests a "testing pyramid": a large base of unit tests, some integration tests, and fewer end-to-end tests. The goal of the "testing pyramid" is to catch a bug with the smallest test possible. For example, an end-to-end test might fail if a function it depends on isn't returning the right value, but it won't give you much information about where the failure is; a unit test for the function will point you towards the failure right away.

That said, a lot of people have a lot of strong (and contradictory) opinions about testing -- don't be surprised if you encounter different practices in different contexts.

##Test Driven Development (TDD)

A common development workflow is to write a bunch of code and then test that code. TDD turns that workflow on its head, calling instead for the tests to be written before a piece of functionality is implemented. This approach has several benefits, most notably that tests get written for everything during the process of development, not as an afterthought. Additionally, writing tests before functionality effectively specifies interfaces for the code you have not written yet, so by the time you need to implement functionality, you already have a very clear understanding of how the code needs to behave. TDD certainly has its disadvantages -- for instance, implementing one feature at a time focusing on passing tests probably won't lead to well organized code. We will not require that you use TDD, but it's common enough that we think it's worth trying out. If you want to read more, [Wikipedia](http://en.wikipedia.org/wiki/Test-driven_development) is a good place to start.

Remember we mentioned that people have strong opinions about testing? Here's a [rant from a former TDD enthusiast](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html) who's changed his mind (and, incidentally, is moving away from unit testing towards system testing).

##Testing Fundamentals

There are several terms used in association with testing that are useful to understand:

**Test Suite**: A test suite consists of all the actual tests for your functionality. This is where the bulk of the work for somebody writing tests goes.

**Test Harness/Framework**: A testing framework is the high level code that defines how to write and run tests. You might be used to print-statement testing -- something along the lines of 'run a bunch of code and look at the console output to check whether the print statements look correct'. A test framework automates all that work for you and reports 'these tests all passed but this one failed and here's why'. You can write a test framework yourself, but there are already quite a few good ones you can use off the shelf. We will be using [Mocha](http://mochajs.org/), because it's fairly common and does both node and browser testing. If you want to take a look at other frameworks, Wikipedia has a fairly comprehensive [list](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript).

**Test Runner**: A test runner runs your tests for you so you don't have to yourself. You tell it where your tests are and you get to run them all with just one command. We will use [Karma](http://karma-runner.github.io/0.12/index.html) for client-side tests. A main benefit of Karma is that it's able to run your app in different browser environments so you can test for cross-browser compatibility. For server-side code, Mocha's built-in runner is good enough. In the end, we will run the command line interface of our tests through npm, but we will get to that a little later.

**Assertion Library**: An assertion library simply defines the interface for doing comparison tests. Mocha supports tons of these, and we'll use [Chai](http://chaijs.com/), which is fairly popular, versatile, and available through npm.

**Continous Integration (CI)**: We won't really deal with CI today, but you might want to use it while you're working on your project. CI goes one step past a test runner and runs your tests for you automatically whenever relevant code changes. Check out [Travis CI](http://docs.travis-ci.com/) if you are interested.

**Code Coverage**: Code coverage tells you how much of your code actually gets run when your test suite runs, so you know if you need to write more tests. It's extraordinarily easy to set up and quite useful. We will be using [Istanbul](https://gotwarlost.github.io/istanbul/) and [Istanbul with Karma](http://karma-runner.github.io/0.8/config/coverage.html). High percentages of code coverage are good, but sometimes it's not worth the time it takes to squeeze out coverage on that last 5% or so of hard-to-test code.

The client-server divide causes problems when writing clientside unit tests. For instance, server-client communications rely on network connectivity, and we really don't want our unit tests to care about whether the network is working.How, then, do we test code that relies on sending out a request and receiving a response? Consider testing one of your client-side ajax requests and the callback it executes. For the purpose of the test, you don't really care what the server is doing as long as it responds correctly, and you will be testing the server code separately anyway. Ideally you would fake the ajax call, receiving the correct response without talking to the server at all. Turns out, that type of faking is called "mocking" -- libraries like [Sinon.js](http://sinonjs.org/) provide mocks for things like Ajax and XHR requests, and even the passage of time.

As you can see, you have tons of choices when setting up a JavaScript testing environment. We'll proceed using an environment we recommend, but it really is only a recommendation -- when you start a new project, it's a good idea to survey your testing options to see what will be the best fit.

##Server-Side Testing with Mocha and Chai

That was a lot of high-level explanation of what we are trying to do, why, and what tools we'll be using, so now it's time to get into setting up our testing environment, starting with server-side tests, which are generally simpler.

There's a very basic app set up in the `preclass` subdirectory, so let's go in there and check it out. From that directory, run `npm install` to get all your dependencies, then start by seeing what the app actually does, with `node app.js`. As you can see, it's very, very basic, and it just tells you hello, but it is a working express app.

Check out the directory structure -- there's a new directory called `tests`, which will allow us to keep tests separate from source code. Inside the `tests` directory there are two subdirectories called `client` and `server`, allowing us to separate server tests from client tests.

We're writing server tests to start with, so open up `test/server/testSpec.js` -- everything's commented out right now. Before we start writing tests, make sure that Mocha is working in the first place. When you ran `npm install`, the `package.json` specified that npm should install Mocha as a development dependency. Now, there's a binary file (`node_modules/mocha/bin/mocha`) that will run tests at the location you specify with a command line argument. Try running your server tests with `./node_modules/mocha/bin/mocha tests/server`, and you should see output like `0 passing (2ms)`, which makes sense because all of the tests are commented out.

Time to write some tests, then. In `testSpec.js`, uncomment up through line 5, so you have:
```node
// Set up our assertion library
var expect = require('chai').expect;

var index = require('../../routes/index');
```
The first line loads the [Chai](http://chaijs.com/) assertion library and assigns its 'expect' test syntax to the variable `expect`, which we will use to check whether things are working as we... well, expect. The second line loads the app's index route, which we'll be testing. If you run the tests again (with `./node_modules/mocha/bin/mocha tests/server`), you should still see `0 passing`, but no errors. Now uncomment so you have the following (make sure you uncomment the `});` on line 21):
```node
describe("A test suite", function() {
  // Synchronous
  it('should use expect syntax', function() {
    expect(false).not.to.be.true;
  });
});
```
Now running the tests should tell us that 1 test is passing! Let's take a look at what just happened. First off, we call the `describe` function, which creates a test suite. The `describe` function's first argument is a string which serves as the name of the test suite. Its second argument is a function that runs the tests in the suite. Next we call `it`, which sets up a test for some piece of functionality. Once again, the first argument is the name of the test, and the second is a function. Inside that function we finally make an assertion using `expect`, which we loaded from Chai earlier. `expect` takes some value and returns an object with a bunch of useful comparison methods. Chai's assertions are very semantic -- `expect(true).to.be.true` looks a lot like English. In fact, the `to` and `be` methods are only there to look like English; the `not` inverts the expect clause, and the `true` actually does the comparison.

All you really need to know is that the test only passes if `false` is not true, and Mocha takes care of the details of reporting the success/failure. Every assertion you write will start with a call to `expect`, will end with some comparison method, and might have some chaining methods in the middle. Chai's assertion methods are documented [here](http://chaijs.com/api/bdd/).

This is all great for synchronous testing, but how do we deal with asynchronicity? We need some way to tell Mocha to wait for our callbacks to run and assertions in them to fire before it finishes testing. We can do that in our call to `it` when setting up our tests. The second argument to `it` is a function, and that function can have 0 or 1 arguments. If the function has 0 arguments, the test is executed synchronously. However, if the function has 1 argument, that argument is another function which is idiomatically called `done`. Now, Mocha will wait until `done` is called before it proceeds with more testing. This way, you can run asynchronous tests by calling `done` in a callback. To see this in action, uncomment lines 15-21 and run the tests again. Now you should see 2 tests passing, and you should notice that the async test takes about a second. Async tests aren't that complicated to do in Mocha, but they are a little dangerous. If `done` never gets called for some reason (like an error in your callback), Mocha will not know to stop waiting for it, and your tests would hang. To prevent hanging, Mocha has a default timeout of 2 seconds on async tests, after which they will fail, which we can see if we change the `1000` in line 20 to `3000`. You can change this timeout manually by setting `this.timeout` to a value in ms inside of your describe function.

Now uncomment the entire file and run the tests again, which should leave us with 3 tests passing within 2 test suites. This is a quick, proof-of-concept test on our index route. If you look at `routes/index`, you will notice we exported index with the method `home`, which is our actual route, and the attribute `ten`, for the purposes of this test. We check to see that `index.ten` is actually 10, as set in the route, and it is.

A quick aside on conventions: you'll notice that test names should sound like a sentence when you prepend the test suite name. Our tests then read as "A test suite should pass", "A test suite should work asynchronously", and "index should have an attribute ten equal to 10". In general, each module will have one test suite (`describe`), and each method within a module will have one test (`it`). There might be multiple assertions within each `it` -- you might want to try the function with multiple inputs. Generally you should also match file structure, with one test suite per file and a directory structure mirroring your source code, although we did not do that here for brevity (theoretically the index tests should live in `tests/server/routes/indexSpec.js`).

Those are the basics of Mocha and Chai, so now you can write server-side tests!

##Client-Side Testing with Karma

Client-side tests are a lot more complicated, since we need to run things in browsers... but thankfully, we can configure Karma to deal with most of that for us. We also won't go into much detail for client-side testing for now, beyond just setting it up and running trivial tests, since dealing with DOM manipulation gets complicated when you are used to rendering templates server-side and don't actually have a server to talk to. So, don't worry if this is a little confusing.

The test syntax will look exactly the same, though -- we're still using Mocha and Chai. If you take a look at `tests/client/testSpec.js`, you can see that we have some of the same tests as before. We don't need to require(`chai`) or the file we're testing this time -- we'll configure Karma to do that for us.

What's different with Karma is its configuration file, `karma.conf.js`. Take a look inside- most of this is boilerplate, but we'll highlight a few important things you'll want to know about. The most important attribute for our config object is `files`, which tells Karma where our tests are and where any client-side source files live. Note that you can include remote URLs here if you are using a CDN for something like JQuery.
```
files: [
  'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
  'public/javascripts/*.js',
  'tests/client/*.js',
],
```
tells Karma to grab JQuery, anything in `public/javascripts` with a `.js` extention, and anything in `tests/client` or its subdirectories with a `.js` extension.

`browsers` is also of note, as that tells Karma which browser environments to run the tests in. `PhantomJS` is a headless browser -- it has a DOM and it can run JavaScript, but it doesn't have a GUI -- so it's good for running command line tests. Chrome is also supported by default, and you can install plugins for other browsers.

The rest of the options are pretty much defaults, but if you want to read about them, check out the [docs](http://karma-runner.github.io/0.8/config/configuration-file.html).

We can run our test suite with `./node_modules/karma/bin/karma start karma.conf.js`, similar to how we ran our Mocha suite earlier. In addition to reporting the test results, since we set up the `coverage` reporter in our conf file, we also now have a `coverage` folder which contains code coverage data as html files. You can take a look at the html files, but they aren't very exciting since there isn't actually any code in our `javascripts` directory to cover. Coverage didn't take much effort to set up, though, and when you're testing real code it's nice to have.

##Running Tasks with `npm`

We can configure `npm` to do quite a bit more than just manage packages. In your `package.json`, you can specify scripts for `npm` to run.

For instance, here's an example `package.json` file with a script named `hello` which prints `hi` to the command line:

###### package.json
```
{
  ...
  "main": "index.js",
  "scripts": {
    "hello": "echo hi"
  }
  ...
}
```

Run scripts with `npm run scriptname`

```bash
$ npm run hello
hi
```

Here's the `scripts` section from the `package.json` in the `preclass` directory -- we're using `npm` to run our unit tests. As you can see, you can even run `npm` tasks with `npm`!
The `cover-mocha` script also shows how to generate server-side code coverage using Istanbul. It's just another simple command, and you can pretty much copy it to any new project. `test` is also a special npm keyword, so you can omit `run` -- typing `npm test` is the same as typing `npm run test`. Try that now and take a look at Istanbul's coverage output for the server-side!

###### package.json
```
{
  ...
  "main": "index.js",
  "scripts": {
    "karma": "./node_modules/karma/bin/karma start karma.conf.js",
    "mocha": "./node_modules/mocha/bin/mocha tests/server",
    "cover-mocha": "./node_modules/istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha tests/server -- -R spec",
    "test": "npm run karma && npm run cover-mocha",
    "start": "nodemon app.js"
  }
  ...
}
```


# Lesson 8 In-Class Exercises

### Cat App Testing:
We've built a testing framework for the cat app with a few example tests (the app and test suite are in the subdirectory `inclass`). Follow the instructions in `inclass/README.md` to get set up, then...
- Add tests for the rest of the cat app.
  - We've set up a tool called supertest for testing the routes modules; those tests live in `test/server/appSpec.js`. Check out the supertest documentation on Github or npm to learn more.
- "Break" the cat app source code in several places to make sure your tests aren't passing when there are problems.
- Trade cat apps with someone else and try to create a bug in the existing cat app code which their tests won't catch.

### Burger App Testing:
With a member of the teaching team and/or in small groups, talk through and implement different tests that you could have for the burger app.

### Task running:
- We've added a code quality checker ([jshint](https://www.npmjs.com/package/jshint)), and we've fixed the cat app so it passes the task.
  - Remove a semicolon at the end of a line somewhere in the code, then run `npm run jshint` -- jshint should catch the mistake for you!
  - Now, add a style checker (e.g. [jscs](https://www.npmjs.com/package/jscs)), and fix your cat app code so it passes the style check.
  - If you're interested, add a minification/bundling task, or a different task of your choice.
- So far you've been running your tests manually with `npm test`... might be getting annoying by now. Fortunately, there are ways to run your test suite whenever you push a branch to Github or whenever your code changes!
  - Set up [npm-watch](https://github.com/grncdr/npm-watch), a module which will run `npm test` when files you specify change.
  - Challenge: Read about continuous integration and work through this [Travis CI tutorial](https://github.com/dwyl/learn-travis).
- We've been using npm to run our tasks for the sake of simplicity (we're already familiar with the package.json file), but there are other task runners out there. [Check out this article](https://ponyfoo.com/articles/choose-grunt-gulp-or-npm) which compares npm to Grunt and Gulp (two other common task runners).
  - Challenge: make a copy of the `inclass` directory and replace npm with a different task runner (e.g. grunt or gulp). What's different? Easier? Harder?
- Many editors support code quality plugins! Try adding a linter (jshint is an option, as are eslint and jslint) to your editor of choice.

# Before Class 9
### Assignment
Using the preclass and inclass exercises as examples, set up a test environment and write tests for Twoter. Then fill out the [Homework Survey]().
