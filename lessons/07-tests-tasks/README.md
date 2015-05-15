#Class 8 - Unit Testing and Task Running

##What is Unit Testing?

Quoth [Wikipedia](http://en.wikipedia.org/wiki/Unit_testing), "unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use." Really what that means is that each piece of functionality gets a test to see if it works in isolation from all other pieces of functionality.

Most of you have probably have heard the words "unit testing" before and probably have some association with lots of print statements to see if things are equal, and really it just takes a lot of time and isn't that important. Not so. 

##Why Unit Test?

Obviously unit testing helps catch bugs and make sure your code works, but it also provides other benefits in terms of overall code quality. Having a good test suite for a project increases maintainability as it becomes harder to introduce new bugs in new versions without breaking tests. Additionally, high quality code tends to be very well encapsulated, and well encapsulated code tends to be easier to test. That said, when you sit down to test something and realize that the test is going to be complicated to write, consider first refactoring the code you are testing so you end up with several tests that are all easier to write, and better code in general as a result. 

##Test Driven Development (TDD)

A common development workflow is to write a bunch of code and then test that code. TDD turns that workflow on its head, calling instead for each piece of functionality to already have tests for it before implementing it. This approach has several benefits, most notably that tests get written for everything during the process of development, not as an afterthought. Additionally, writing tests before functionality effectively specifies interfaces for the code you have not written yet, so be the time you need to implement functionality, you already have a very clear specification for what that code should look like. This ties developers to functionality requirements better than just letting them write whatever, so you end up with less code that you do not need. TDD does have the disadvantage of requiring frequent refactoring, as implementing one feature at a time focusing on passing tests probably won't lead to very well organized code. That said, there are many more pros and cons of TDD outside the scope of this class. We will not require you to use TDD practices, but we recommend trying them out at some point. If you want to read more on TDD, [Wikipedia](http://en.wikipedia.org/wiki/Test-driven_development) is a good place to start.

##Unit Testing Fundamentals

There are several terms used in association with testing that are useful to understand:

**Test Suite**: A test suite consists of all the actual tests for your functionality. This is where the bulk of the work for somebody writing tests goes.

**Test Harness/Framework**: A testing framework is the high level code that defines how to write and run tests. Essentially this is what moves testing from 'run a bunch of code and look on the command line to see if it outputted the right thing' to something that does all of that comparison work for you, sorts through what's right and what's wrong, and tells you 'these all passed but this one failed and here's why'. You can write these yourself, but there are so many good ones to choose from. We will be using [Mocha](http://mochajs.org/), because it's fairly common and does both node and browser testing, but if you want to take a look at other frameworks, Wikipedia has a fairly comprehensive [list](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript)

**Test Runner**: A test runner runs your tests for you so you don't have to yourself. You tell it where your tests are and you get to run them all with just one command. We will use [Karma](http://karma-runner.github.io/0.12/index.html) for client-side tests. Karma's main benifit is that for testing client-side code, it deals with running your code in various browser environments so you can test for cross-browser compatability. For server-side code, mocha's built in runner is good enough. In the end, we will run the comman line interface of our tests through npm, but we will get to that a little later. 

**Asserion Library**: Everybody likes to write their tests differently, so people made assertion libraries. An assertion library simply defines the interface for doing comparison tests. Mocha supports tons of these, and [Chai](http://chaijs.com/) is fairly popular and versatile and can be installed through npm, so we will use it. 

**Continous Integration (CI)**: We aren't going to deal with CI today, but it may come up during project time. CI goes one step past a test runner and runs your tests for you automatically whenever relevant code changes. Check out [Travis CI](http://docs.travis-ci.com/) if you are interested. 

**Code Coverage**: Pretty straightforward, code coverage tells you how much of your code actually gets run when your test suite runs, so you know if you need to write more tests. It's extraordinarily easy to set up and quite useful. We will be using [Istanbul](https://gotwarlost.github.io/istanbul/) and [Istanbul with Karma](http://karma-runner.github.io/0.8/config/coverage.html). High percentages of code coverage are good, but sometimes it's not worth the time it takes to squeeze out coverage on that last 5% or so of hard to test code.

The client-server divide causes serious problems for javascript testers. A problem that we do not have because we are working in nodejs is that most servers aren't even written in javascript. Additionally, server-client communications rely on network connectivity, and we really don't want our tests to care about whether the network is working. The same applies to any database interactions the server might execute. How then, do we test code that relies on sending out a request and receiving a response? Consider, for example, testing one of your client-side ajax requests and the callback it executes. For that test, you don't really care what the server is doing as long as it responds correctly, and you will be testing the server code separately anyway, so ideally you would fake the ajax call and just go straight to having the correct response without ever talking to the server at all. Turns out, you can do that, using [Sinon.js](http://sinonjs.org/), which provides several useful mocks of things like Ajax and XHR requests, and even the passage of time. The general idea is that any request-response interface can be faked, and Sinon provides a library to do that.

As you can see, there are tons of options for what to use for your javascript testing environment. We'll be going onwards with our recommendations, but they are just that, and any time you start a new project, it's a good idea to survey your testing options to see what will best fit your project.

##Getting Started with Mocha and Chai for Server-Side Testing

That was a lot of high-level explanation of what we are trying to do, why, and what tools we have for it, so now it's time to get into setting up our testing environment, starting with server-side tests, which are generally simpler. There's a very basic app set up in the `in_class` subdirectory, so let's go in there and check it out. From that directory, run `npm install` to get all your dependencies, then start by seeing what the app actually does, with `node app.js`. As you can see, it's very, very basic, and it just tells you hello, but it is a working express app. Checking out the directory structure shows us that we have a new folder called tests, and in that a folder called client and a folder called server. That structure allows us to keep tests separate from source code and server tests separate from client tests. Inside the server tests you will see `test.js`, a file with everything commented out right now. Before we start writing tests, let's make sure that mocha is working in the first place. When we installed mocha, it gave us a binary file that will run our tests with the location of our tests as a command line argument. We can run our server tests with `./node_modules/mocha/bin/mocha tests/server`, which should give output like `0 passing (2ms)`, which makes sense because we don't have any tests written.

Time to write some tests then. In `test.js`, uncomment up through line 5, so you have:
```node
// Setup our assertion library
var expect = require('chai').expect;

var index = require('../../routes/index');
```
The first line loads the [Chai](http://chaijs.com/) assertion library and assigns it's 'expect' test syntax to the variable `expect`, which we will use to write tests. The second line just loads our index route, because we will want to test that. If we run our tests again, we should still see nothing passing, but no errors. Now uncomment up to line 17, as well as line 22, leaving you with:
```node
describe("A test suite", function() {
	// Synchronous
	it('should use expect syntax', function() { 
		expect(true).to.be.true; 
	});
});
```
Now running the tests should tell us that 1 test is passing! Let's take a look at what we just did. First off, we call the `describe` function, which creates our test suite. It takes a string, which serves as the name of the test suite, as well as a function with no arguments that runs the tests in the suite. Next we call `it`, which sets up a test for some piece of functionality, taking first the name of that test, and then a function, in this case with no arguments. Inside that function we finally make an assertion using `expect`, which we loaded from chai earlier. `expect` takes some value and returns an object with a bunch of useful comparison methods that will compare to the object we passed in. In this case `expect(true).to.be.true` is a very sematic assertion compared to the more traditional `assert(true === true)`. An additional benefit of this syntax is the ability to provide more useful messages about what failed when a test does not pass. It's worth noting that the `to` and `be` methods actually do nothing except look like english. The `not` method, however, inverts the expect clause. `true` is what actually does a comparison. All you really need to know is that it checks what comes before it to see if it is truthy, and if so it passes the test and otherwise it fails, and mocha takes care of the details of reporting that out. Every assertion you write will start with a call to `expect`, have some chaining methods (or maybe none), and some comparison method at the end. Chai's assertion methods are documented [here](http://chaijs.com/api/bdd/).

This is all great for synchronous testing, but how do we deal with asynchronicity? We need some way to tell mocha to wait for our callbacks to run and assertions in them to fire before it finishes testing. We can do that in our call to `it` when setting up our tests. The second argument to `it` is a function, and that function can have 0 or 1 arguments. In the 0 argument case, it does synchronous tests like above. In the 1 argument case, however, your `it` function receives as an argument another function, idiomatically called `done`. Now, mocha will wait until `done` is called before it proceeds with more testing, allowing you to call `done` after running assertions in a callback to run async tests. Uncomment lines 15-21 and you can see this in action. Running our tests now shows 2 passing, one of which takes about a second, showing that our async test is working. Async tests aren't that complicated to do in mocha, but they are a little dangerous. If `done` never gets called for some reason (like an error in your callback), mocha will not know to stop waiting for it, and your tests would hang. To prevent hanging, mocha has a default timeout of 2 seconds on async tests, after which they will fail, which we can see if we change the `1000` in line 20 to `3000`. You can change this timeout manually by setting `this.timeout` to a value in ms inside of your describe function. 

Now let's uncomment the entire file and run our tests, which should leave us with 3 tests passing within 2 test suites. This is a quick, proof-of-concept test on our index route. If you look in the route, you will notice we exported index with the method `home`, which is our actual route, and the attribute `ten`, for the purposes of this test. We check to see that `index.ten` is actually 10, as set in the route, and it is. As a quick aside on the naming of tests, you'll notice that test names should sound like a sentence when you prepend the test suite name. Our tests then read as "A test suite should pass", "A test suite should work asynchronously", and "index should have an attribute ten equal to 10". This leads to a general structure of unit tests with one test suite per module and one test per method within a module, sometimes with more than one assertion to test that method in the case where you want to try multiple inputs. Generally you would also match file structure, with one test suite per file and a directory structure mirroring your source code, although we did not do that here for brevity (theoretically the index tests should live in `tests/server/routes/index.js`).

Those are the basics of mocha and chai, so now you can write server-side tests!

##Client-Side Testing with Karma

Client-side tests are a lot more complicated, since we need to run things in browsers, but thankfully, karma deals with most of that for us once we set up some configuration stuff. We also will not be going into much detail for client-side testing for now, beyond just setting it up and running trivial tests, since dealing with DOM manipulation gets complicated when you are used to rendering templates server-side and don't actually have a server to talk to. That said, don't worry if you are a little confused with this stuff.

In terms of actually syntax of tests, everything should be identical since we are using mocha and chai still with karma. If you take a look at `tests/client/test.js`, you can see that we have the same tests as before (except for our server side route). We don't need to load chai this time, since karma will do that for us.

What's different with karma is its configuration file, which you can find at `karma.conf.js`. Take a look inside- most of this is boilerplate, but we will highlight a few important things that you will want to know about. The most important attribute for our config object is `files`, which tells karma where are tests are and also where any client-side source files live. Note that you can include remote URLs here if you are using a CDN for something like JQuery.
```
files: [
  'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
  'public/javascripts/*.js',
  'tests/client/*.js',
],
```
tells karma to grab JQuery, anything in `public/javascripts` with a `.js` extention, and anything in `tests/client` or its subdirectories with a `.js` extension.

`browsers` is also of note, as that tells karma which browser environments to run the tests in. `PhantomJS` is what we call a headless browser, essentially meaning it has all the browsery features like a DOM and being able to run javascript, but it doesn't have a GUI so it's good for running command line tests. Chrome is also supported by default, and other browsers have plugins.

All the other options you can pretty much keep as-is, but if you want to read about them, check the [docs](http://karma-runner.github.io/0.8/config/configuration-file.html). 

We can run our test suite with `./node_modules/karma/bin/karma start karma.conf.js`, similar to how we ran our mocha suite earlier. In addition to reporting the test results, since we set up the `coverage` reporter in our conf file, we also now have a `coverage` folder which contains code coverage data as html files. You can take a look at them, but they aren't very exciting since there's not actually any code in our `javascripts` directory to cover, but they take little effort to set up and when you are testing real code they are nice to have. 

##Running Tasks with `npm`

We can configure `npm` to do quite a bit more than just manage packages. In your `package.json`, you can specify scripts that `npm` can then run.

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

Below is the `scripts` section from the in-class exercise `package.json` showing how we can use `npm` to run our unit tests. As you can see, you can even run `npm` tasks with `npm`!
The `cover-mocha` script also shows how to generate server-side code coverage using Istanbul. It's just an extra simple command, and you can pretty much copy it to any new project. `test` is also a special npm keyword, so you can omit `run` and just run `npm test` to run all our tests. Try that now and take a look at Istanbul's coverage output for the server-side!

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
