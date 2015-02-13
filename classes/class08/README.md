#Class 8 - Unit Testing and Task Running

##What is Unit Testing?

Quoth [Wikipedia](http://en.wikipedia.org/wiki/Unit_testing), "unit testing is a software testing method by which individual units of source code, sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures, are tested to determine whether they are fit for use."

Most of you have probably have heard the words "unit testing" before and probably have some association with lots of print statements to see if things are equal, and really it just takes a lot of time and isn't that important. Not so. 

##Why Unit Test?

Obviously unit testing helps catch bugs and make sure your code works, but it also provides other benefits in terms of overall code quality. Having a good test suite for a project increases maintainability as it becomes harder to inroduce new bugs in new versions without breaking tests. Additionally, high quality code tends to be very well encapsulated, and well encapsulated code tends to be easier to test. That said, when you sit down to test something and realize that the test is going to be complicated to write, consider first refactoring the code you are testing so you end up with several tests that are all easier to write, and better code in general as a result. 

##Test Driven Development (TDD)

A common development workflow is to write a bunch of code and then test that code. TDD turns that workflow on its head, calling instead for each piece of functionality to already have tests for it before implementing it. This approach has several benefits, most notably that tests get written for everything during the process of development, not as an afterthoguht. Additionally, writing tests before functionality effectively specifies interface for the code you have not written yet, so be the time you need to implement functionality, you already have a very clear specification for what that code should look like. This ties developers to functionality requirements better than just letting them write whatever, so you end up with less code that you do not need. TDD does have the disadvantage of requiring frequent refactoring, as implementing one feature at a time focusing on passing tests probably won't lead to very well organized code. That said, there are many more pros and cons of TDD outside the scope of this class. We will not require you to use TDD practices, but we recommend trying them out at some point. If you want to read more on TDD, [Wikipedia](http://en.wikipedia.org/wiki/Test-driven_development) is a good place to start.

##Unit Testing Fundamentals

There are several terms used in association with testing that are useful to understand:

**Test Suite**: A test suite consists of all the actual tests for your functionality. This is where the bulk of the work for somebody writing tests goes.

**Test Harness/Framework**: A testing framework is the high level code that defines how to write and run tests. Essentially this is what moves testing from 'run a bunch of code and look on the command line to see if it outputted the right thing' to something that does all of that comparison work for you, sorts through what's right and what's wrong, and tells you 'these all passed but this one failed and here's why'. You can write these yourself, but there are so many good ones to choose from. We will be using [Mocha](http://mochajs.org/), because it's fairly common and does both node and browser testing, but if you want to take a look at other frameworks, Wikipedia has a fairly comprehensive [list](http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript)

**Test Runner**: A test runner runs your tests for you so you don't have to yourself. You tell it where your tests are and you get to run them all with just one command. We will use [Karma](http://karma-runner.github.io/0.12/index.html) for client-side tests. Karma's main benifit is that for testing client-side code, it deals with running your code in various browser environments so you can test for cross-browser compatability. For server-side code, mocha's built in runner is good enough. In the end, we will run the comman line interface of our tests through npm, but we will get to that a little later. 

**Asserion Library**: Everybody likes to write their tests differently, so people made assertion libraries. An assertion library simply defines the interface for doing comparison tests. Mocha supports tons of these, and [Chai](http://chaijs.com/) is fairly popular and versatile and can be installed through npm, so we will use it. 

**Continous Integration (CI)**: We aren't going to deal with CI today, but it may come up during project time. CI goes one step past a test runner and runs your tests for you automatically whenever relevant code changes. Check out [Travis CI](http://docs.travis-ci.com/) if you are interested. 

**Code Coverage**: Pretty straightforward, code coverage tells you how much of your code actually gets run when your test suite runs, so you know if you need to write more tests. It's extraordinarily easy to set up and quite useful. We will be using [Istanbul](https://gotwarlost.github.io/istanbul/) and [Istanbul with Karma](http://karma-runner.github.io/0.8/config/coverage.html).

Javascript testing, for things like client-side interaction and client-server interactions brings with it some unique challenges. Consider, for example, testing one of your client-side ajax requests and the callback it executes. For that test, you don't really care what the server is doing as long as it responds correctly, and you will be testing the server code separately anyway, so ideally you would fake the ajax call and just go straight to having the correct response without ever talking to the server at all. Turns out, you can do that, using [Sinon.js](http://sinonjs.org/), which provides several useful mocks of things like Ajax and XHR requests, and even the passage of time. 

As you can see, there are tons of options for what to use for your javascript testing environment. We'll be going onwards with our recommendations, but they are just that, and any time you start a new project, it's a good idea to survey your testing options to see what will best fit your project.

##Getting Started with Karma and Mocha