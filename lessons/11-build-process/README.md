#Lesson 11 - Build Process

## README Table of Contents
* [Build Process](#build-process)
  * [Compilers](#compilers)
  * [Bundlers](#bundlers)
  * [Task Runners](#task-runners)
* [In-Class Activities](#inclass-11)
* [Homework](#homework-11)

<a name="build-process"></a>

----------------------
# Deep Dive: The Build Process

## Why?
As you start to create more and more ambitious apps, the time you invest in a build process which automates work for you, cleans up your code, and gives you access to more features becomes more worth it. These tools can be intimidating to learn at first, but with a bit of pre-work, they can make your life a ton easier.

## The Parts of the Process

### Compilers
Broadly speaking, a compiler translates code written in one language to another. You may also see the term "transpiler" when reading about compilers (especially in javascript land) -- usually "compiling" refers to changing levels of abstraction (e.g.: you compile C into machine code), while "transpiling" does not change the level of abstraction (e.g. you transpile the latest Javascript _ES6_ or _ES7_, into the _ES5_ javascript syntax you are used to). You've probably already used compilers in Olin.js to convert SASS or LESS to CSS.

Speaking of _ES6_ and _ES7_: The most recent ECMAScript standards smoothed over some of the ugly parts of javascript (I'm looking at your Javascript Object Oriented Programming) while adding a ton of new features, functionality, and syntactical sugar. We'll get into how to use these new features in the exercises.

You may also run into Typescript, CoffeeScript, or Elm as you explore the world of javascript compilers. These are all languages (among many others) built on top of or to compile down to Javascript. They also require compilers or transpilers to be used on the web.

For now, we are going to consider the most common use case, transpiling into _ES5_ javascript. In this case, the most popular tool is:

##### Babel
![Babel](https://avatars0.githubusercontent.com/u/9637642?v=3&s=400)

Babel can convert basically any javascript (including jsx!) you can imagine into es5. It does this by requiring users to specify a ```preset``` or a set of presets that Babel will use to do the compilation. You can also specify ```plugins``` to extend the features of Babel. The way that you specify presets and plugins you can check out the ```grunt```, ```gulp```, and ```webpack``` examples in this director to see how preset and plugin specification works in each of those cases.

###### Readings
- [Docs](https://babeljs.io/)
- [What is Babel the Javascript Compiler](http://www.programwitherik.com/what-is-babel-the-javascript-compiler/)

### Bundlers
You may have noticed that as the client-side portions of your apps get bigger, dealing with importing scripts, CSS, and images becomes a huge pain in the @#$. Wouldn't it be nice if we could require files like we can on our server? Well, do I have good news for you -- That's just what ```Browserify``` and ```webpack``` do.

##### Browserify
![Browserify](http://derickbailey.com/wp-content/uploads/2014/06/NewImage.png)

Browserify aims to recreate the node-style ```require``` system on the client. Browserify is great because it lets you bundle most serverside modules and their dependencies into files which can be required clientside. It also allows you to bundle your clientside javascript into one concise file to serve. Since Broswerify recreates the node ```require``` system the syntax will be very familiar to you. However, Browserify falters when it comes to dealing with files that aren't common on servers such as CSS and images. You can shoe horn support for other file types, but it can get pretty messy.

###### Readings
- [Docs](http://browserify.org/)
- [Browserify Handbook](https://github.com/substack/browserify-handbook)
- [Getting Started with Browserify](http://www.sitepoint.com/getting-started-browserify/)

##### Webpack
![Webpack](https://camo.githubusercontent.com/f1d103872f836f33dbff7a74ed819004f792a4ad/687474703a2f2f7765627061636b2e6769746875622e696f2f6173736574732f6c6f676f2e706e67)

Webpack is the current darling of the frontend programming world. It is an incredibly powerful bundling tool, but initially grokking (understanding) it can be stupidly difficult. Webpack can be configured to deal with any file type using a variety of ```loaders```. These loaders can be very powerful -- for example, the Babel loader compiles/transpiles your javascript files before bundling them. You can use any module system with webpack, including the node-like ```require``` system and the new ES6 module syntax. Webpack is an incredibly versatile and powerful tool which can also do most of the things you would need a task runner (see below) to do. It is frequently used entirely on its own.

###### Readings
- [Docs](http://webpack.github.io/docs/)
- [Beginner's Guide to Webpack](https://medium.com/@dabit3/beginner-s-guide-to-webpack-b1f1a3638460#.pww8hq4f2)
- [Webpack Howto](https://github.com/petehunt/webpack-howto#webpack-howto)

### Task Runners
If you want to coordinate your various tasks, such as compiling code, checking for syntax errors, running tests, bundling your javascript, you may want to use a task runner. They make it easy to configure and automate running tasks for you. The two most common ones are ```Grunt``` and ```Gulp```.

##### Grunt
![Grunt](http://www.chloechen.io/wp-content/uploads/2014/11/logo.png)

When you set up Grunt, you write a ```gruntfile```. This file defines a configuration object with a list of tasks and then registering them to commands or events. For a look at what the syntax is like see the readings below or the example in this directory.

###### Readings
- [Docs](http://gruntjs.com/)
- [Best Practices for Building Angular-js Apps](https://medium.com/@dickeyxxx/best-practices-for-building-angular-js-apps-266c1a4a6917#.1ridn33pb)
- [Grunt for People Who Think Things Like Grunt are Weird and Hard](https://24ways.org/2013/grunt-is-not-weird-and-hard/)

##### Gulp
![Gulp](https://cdn-images-1.medium.com/max/256/1*ChsbcZblo-_YsMqXNQXymg.png)

In contrast to Grunt, Gulp works by piping files through a series of specialized plugins. It relies on some modern JavaScript features you might be familiar with -- namely, node streams and promises. Gulp can be harder to wrap your head around initially but generally the files are shorter and they run faster than Grunt. It's also a great way to get more hands on experience with streams and promises.

###### Readings
- [Docs](http://gulpjs.com/)
- [Getting Started With Gulp](http://www.hongkiat.com/blog/getting-started-with-gulp-js/)

## What Comes Next
In this repo I have three complete build processes using ```Gulp```, ```Grunt```, and ```webpack``` respectively. They all have very similar features so that you can compare them to each other. Each process has an included package.json with the dependencies you will need to install in your projects to make them work. The examples won't run on their own, but each one has a README file which explains how to integrate it with your project and run it. Afterwards have a look at the exercises to practice modifying the build processes and taking advantage of the features they give you.

<a name="inclass-11"></a>

----------------------
# Lesson 11 In-Class Exercises

##Incorporating Webpack
Now that we have experience with React, we're going to incorporate build processes into our development process. Webpack is commonly used in software companies, and we are going to utilize it for the purpose of our mini-project and final project. Follow along this tutorial to add webpack to the previous React tutorial that we did last week in lesson 9.

1. Using the [REACT project](../09-clientside-frameworks/REACT), add all of the necessary packages outlined in the `package.json` file from the [webpack folder in this directory](webpack/package.json) (You can copy and paste all of the devDependencies, and `npm install`).
2. In `package.json` of our React App, we're going to add a build script, so add `"build": "webpack --config webpack.config.js,"` above the start script. This will use webpack to rebundle all of your changes. You will want to run `npm run build` before running `npm start` everytime you make changes, so that your main script js file can be rebuilt.
3. Now is the important part! We want to add a `webpack.config.js` file to our root directory. Copy and paste the one from the [webpack folder](webpack/webpack.config.js). Notice a couple things:
  - We now have an `APP_DIR` set to the path `react_components`, which we want to house all of our react components now, which we can now use the `.jsx` extension for our components. Since we want to link `index.js` as our entry jsx file, note that we indicate that in the entry field: `entry: APP_DIR + '/index.jsx',`
    - So create a folder called `react_components/` and create a new file called `index.jsx` and paste everything you had in `public/scripts/main.js` into the file.
  - Next, in the output field of our config file, we specify that the path `public/scripts/` is `BUILD_DIR`, and our output filename is: `filename: "bundle.js",`. This is the standard for webpack, so we have to rename `main.js` in `public/scripts` to `bundle.js`. In addition, we have to change the script link that we put in the html to be `bundle.js`.
4. When you run `npm run build`, you should see something like this:

    ```
    Hash: 13238165efbaf652155d
    Version: webpack 1.14.0
    Time: 2913ms
        Asset    Size  Chunks             Chunk Names
    bundle.js  141 kB       0  [emitted]  main
        + 32 hidden modules

    ```
  This means that the build was successful, and that `bundle.js` has all of the jsx files bundled into it.
5. Lastly, run `npm start`, and you should be able to access `localhost:3000`

Now, you can have more react components separated into jsx files, and link them into each other using `var OtherComponent = require('./othercomponent.jsx');`!

##Mashup Mini-Project Team Formation
Get pumped! We're going to be forming teams for our mini project. The goal of the mini project is to utilize all of the information and skills that we have learned thus far, work with a partner, and allow you all to dictate what you want to create!

In class, we're going to form teams. If you've finished everything else in this readme, checkout the miniproject [description](../../miniproject/README.md) to get started.


<a name="homework-11"></a>

----------------------
# Before Class 10 (Friday 3/10/2017)
Work on the [miniproject](../../miniproject/README.md)!
