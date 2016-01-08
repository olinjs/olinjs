# Lesson 8 In-Class Exercises

## Testing:
We've built a testing framework for the cat app with a few example tests (the app and test suite are in the subdirectory `inclass`). Follow the instructions in `inclass/README.md` to get set up, then...
- Add tests for the rest of the cat app.
  - We've set up a tool called supertest for testing the routes modules; those tests live in `test/server/appSpec.js`. Check out the supertest documentation on Github or npm to learn more.
- "Break" the cat app source code in several places to make sure your tests aren't passing when there are problems.
- Trade cat apps with someone else and try to create a bug in the existing cat app code which their tests won't catch.

## Task running:
- We've added a code quality checker ([jshint](https://www.npmjs.com/package/jshint)), and we've fixed the cat app so it passes the task.
  - Remove a semicolon at the end of a line somewhere in the code, then run `npm run jshint` -- jshint should catch the mistake for you!
  - Now, add a style checker (e.g. [jscs](https://www.npmjs.com/package/jscs)), and fix your cat app code so it passes the style check.
  - If you're interested, add a minification/bundling task, or a different task of your choice.
- So far you've been running your tests manually with `npm test`... might be getting annoying by now. Fortunately, there are ways to run your test suite whenever you push a branch to Github or whenever your code changes!
  - Set up [npm-watch](https://github.com/grncdr/npm-watch), a module which will run `npm test` when files you specify change.
  - Challenge: Read about continuous integration and work through this [Travis CI tutorial](https://github.com/dwyl/learn-travis).
- We've been using npm to run our tasks for the sake of simplicity (we're already familiar with the package.json file), but there are other task runners out there. [Check out this article](https://ponyfoo.com/articles/choose-grunt-gulp-or-npm) which compares npm to Grunt and Gulp (two other common task runners).
  - Challenge: make a copy of the `inclass` directory and replace npm with a different task runner (e.g. grunt or gulp). What's different? Easier? Harder?

If you're done, start the homework!
