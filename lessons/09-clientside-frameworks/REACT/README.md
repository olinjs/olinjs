![serverOrganizedSystem](../images/react_logo.png)


##So first off, what is React?

React is a Javascript library for building interfaces. So far, we’ve been using Handlebars templates to render HTML and then jQuery to make buttons make post requests and the like. We’re going to be replacing all of that hoo-ha with React, your new one-stop shop for everything your user is going to see in your application.

##Why React?

There are many, many alternatives that you guys can learn about in this class for client-side frameworks. There’s React, Ember, Angular, Backbone, and something hip and new I’m sure one of you is already “totally the master at” because it is just so **“rad”**. Don’t believe me? Just ask Austin, he was like this about React for literally all of last year. The point is, there are a ton of options out there.

We, as the teaching team, chose React because it fits our purposes in this course and it has become a really popular framework that is used by Facebook, Instagram, Netflix, Feedly, Airbnb, Walmart, and a ton of others. It’s lightweight, fast, easily adaptable to mobile devices, and works with Node!

That being said, we totally encourage you guys to go out and learn something new. We’ll be super-psyched to use your “totally rad” app.

##Okay, so how do we use it?

The first thing you need to know is that each HTML tag you use in Handlebars or in raw HTML is an element of the DOM, which stands for Document Object Model. At a really high level, the way React works is that it creates its own React DOM, which reflects the HTML DOM. When changes are made (buttons clicked, requests made, etc.), the React DOM first figures out what needs to change in the HTML DOM and updates it, as opposed to re-rendering the page from the top down. This is why React is so fast!

So the basic building block of the React DOM, just as it is for the HTML DOM, is the element. The React DOM updates the HTML DOM to match the React elements. React elements are immutable, which means they can’t be changed. An element is like a single frame of a movie. It represents the interface the user is seeing at a single point in time.

Facebook has great documentation about [REACT](https://facebook.github.io/react/). Take a look at the docs, usage and tutorial.

Now, let's get into a tutorial to understand the components of React.

---------

#REACT Example Tutorial

In this folder, we have a very basic React app setup. Take a look at the different components that hook up React, and notice the differences from Handlebars. Things to notice:

In `package.json`, we now have `react` and `react-dom` dependencies:

```
"dependencies": {
  "body-parser": "^1.16.1",
  "express": "^4.14.1",
  "path": "^0.12.7",
  "react": "^15.4.2",
  "react-dom": "^15.4.2"
},
"devDependencies": {
  "react-dom": "^15.4.2"
}
```

In addition, we have to hook up the scripts for React in `index.html`:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.7/react-dom.js"></script>
```

Also in `index.html`, we have a div called content, which is where all React elements will be rendered into, and a script tag to `main.js`. `main.js` is where we have all of our react components, and utilizes babel to compile your javascript code into browser-compatible javascript:
```
<body>
  <div id="content"></div>
  <script type="text/babel" src="scripts/main.js"></script>
</body>
```

Now, notice the big difference in `public/scripts/main.js`. In the bottom of the file, we utilize ReactDOM to render a React element into the DOM in the supplied container (in this context, it is the id content):
```
ReactDOM.render(
  <HelloWorld />,
  document.getElementById('content')
);
```

`<HelloWorld />` is top-most element rendered in our "content" div.

##Adding On

Now notice that "Hello World" is the h1 tag that shows up when you go to `localhost:3000` after running `npm start`. This is because of the `HelloWorld` react component/element.

For every react component, there is a required method called `render()`, which can return more React elements
in a representation of a native DOM component, such as ``<div />``, or another composite component that you've defined yourself.

Let's create a new react component and render it within the `HelloWorld` element in the same form and put it in the same file. For example:
```
var DankParagraph = React.createClass({
  render: function() {
    return (
      <div>
        <p> React is super duper sweet! </p>
      </div>
    );
  }
});
```

To render this within our `HelloWorld` element, we need to place the new react element tag into our render function. For example, `<DankParagraph />` would go under the `h1` tag.

Now, checkout your web page and you should see your new element rendered.

##React.Component

In addition to the render method, there are many other "lifecycle methods" that you can override to perform different functionalities. There are way too many to go through all of them right now, but take a look at this [react-component link](https://facebook.github.io/react/docs/react-component.html).

These methods include mounting (you can decide what happens during render, after the first render,...), updating (methods that will be called when component is re-rendered), and unmounting (when component is removed from DOM).

Go through all of the references to understand what is going on, and possibly implement a few.

##States and Props: Instance Properties

Now, comes the really cool part. React allows for instance properties. What are these, well through props and state, React elements can have their own states with data specific to each of them, and pass data and functions to particular children components that they have.

###this.state
Let's say that we want the header of the web page to render and say whatever is retrieved from the backend when the `componentDidMount`. This means that we can utilize states to hold information that we can set again later when data changes and/or pass to children nodes through the `this.state` property.

Above the `render()` method (render should always be the last method in the component class) of the HelloWorld element, let's add this method:
```
getInitialState: function() {
  return {
    h1Text: ''
  };
},
```

And set the `h1` tag to contain this state in a very similar fashion to handlebars. `this.state.h1Text` connects the text that will show up to the state that may change:
```
<h1>{this.state.h1Text}</h1>
```

What this does is have the initial state contain a field that is currently an empty string, but can be set to something else and then initiate a re-rendering. When you check out the web page, you will notice that there is no longer any header, because it is an empty string.

We can now call our API route and access data, like we've done before! As mentioned before, we will now add a `componentDidMount` method `getInitialState` that will make an ajax request to get data that we we can then use to set our state:

```
componentDidMount: function() {
  $.ajax({
			url: '/api/',
			dataType: 'json',
			cache: false,
			type: 'GET',
			success: function(data) {
        //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
				this.setState({
					h1Text: data.text
				});
			}.bind(this),
			failure: function(xhr, status, err) {
				console.error('GET /api', status, err.toString());
			}.bind(this)
		});
},
```

TA-DA! Now, you will notice that h1Text is set to the text field of data, which gets re-rendered every time some state is changed.

###this.props
In our example above, `DankParagraph` element is a child of `HelloWorld` element. As a result, `DankParagraph` can utilize data and functions passed from `HelloWorld` through the `this.props` properties. Let's say that we actually want to render the information you get from the backend in your `DankParagraph`. To do this, you can add attributes to the tag with any name you want and set them to be the state or any functions that your `HelloWorld` would want to pass on:
```
<DankParagraph pText={this.state.h1Text} someRandomFunction={this.someRandomFunction} />
```

And alter the p tag of `DankParagraph` the prop pText:
```
<p>{this.props.pText}</p>
```

Be careful and remove `someRandomFunction={this.someRandomFunction}` unless you want to create a random function within the `HelloWorld` element.

Now, you should be able to see the text set!

##JSX
<!-- While you don't need to implement JSX, JSX is a preprocessor step that adds XML syntax to Javascript and makes React more elegant. In order to incorporate JSX, you need a transpiler, like babel, to compile the language to be javascript-current, and a bundler, like webpack, grunt or browserify, to write modular code and bundle it together into small packages to optimize load time.

We highly recommend utilizing JSX once you grow more comfortable with React. -->

##MORE...
Now that we've shown you the basics of React, there's still so much more to learn. Be sure to ask us tons of questions, and also look and utilize the internet when you do get stuck because there is tons of documentation and forums regarding React. Here are some guides:

* [Guild to Building Web Apps with React](https://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)
* [Learn Raw React](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/)
* [More Tutorials](https://www.codementor.io/reactjs/tutorial)

###We never go out of style
Good style is imperative for readability and consistency. Be sure to take a look at different style guides. Here's one that follows the ES5 syntax that we have been using: [react-style-guide](https://github.com/payscale/react-style-guide).

###create-react-app package
Instead of needing to write and have our own boilerplate for starting a React App, there's a great package that we will be using, called `create-react-app`. You can find the documentation [here](https://github.com/facebookincubator/create-react-app#getting-started).

Basically, you want to run the following commands to create a directory with all of the files that would make a basic react app:
```
sudo npm install -g create-react-app

create-react-app my-app
cd my-app/
```
