#Lesson 9 - Client-side Javascript Frameworks

##A Difficult Decision
Comparing React and Angular is very difficult due to their fundementally different approaches to organizing your client side code. Both frameworks have pros and cons and which one you should use varies both on your personal taste and the project you are working on.

##History
Angular has been around for a while. Since 2009, Angular has been assigning custom attributes, known as directives, to the HTML elements of the DOM to provide them with more advanced functionality. Angular is mature, commonly used, and there are a ton of great resources for getting up and running with it. React is quite young. Created by Facebook in 2013, React has presented itself as a new paradigm of web development. React eschews the normal separations of concerns, page layout in html, interaction in javascript, and style in css, for a new approach; self contained and modular components. These components define the layout and logic of a component (like a button) in one place. You can then reuse and nest these components to create complex interfaces. On top of this, React boasts a performance-minded view renderer capable of rendering large amounts of data without missing a beat. (Note, a new version of Angular, Angular 2, has recently entered beta which is a fundemental redesign of Angular, taking many cues from React. While we are excited to see Angular 2, we can't in good concious recommend using it yet as the documentation is still incomplete and not ready for production.)

##Research
- Find Angular and React documentation online. Pay particular attention to the following keywords:

####Angular
- Two-way data binding
- Controllers
- Services
- Directives
- Scopes

####React
- Virtual DOM
- ReactComponents
- JSX
- State vs Props
- Uni-directional Data flow
- Flux

Here are some links to start you out:
- [Angular Conceptual Overview](https://docs.angularjs.org/guide/concepts)
- [Angular Data Binding](https://docs.angularjs.org/guide/databinding)
- [Why Build React?](http://facebook.github.io/react/blog/2013/06/05/why-react.html)
- [A Closer Look into React by Pete Hunt](https://www.quora.com/profile/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look)
- [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)

##Hello Angular
Here's just about the simplest Angular app you can write. The words you type in the textbox will show up after "Hello" in the <h1> tag.
```html
<!DOCTYPE html>
<html ng-app>
<head>
    <title>Hello World, AngularJS</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</head>
<body>

    Write some text in textbox:
    <input type="text" ng-model="sometext" />

    <h1 ng-show="sometext">Hello {{ sometext }}</h1>

</body>
</html>
```
The first thing we notice is the use of an attribute **ng-app** with the html tag. This attribute, known as a directive, signals Angular to be active in this portion of the page. Another important thing to note is the use of the **ng-model** directive. **ng-model** binds the state of the textbox with the model value, i.e. "sometext". As a result, whenever the textbox value changes, Angular authomatically changes the model "sometext" to the respective value. This is what is known as Two-way Data Binding. Moreover, **{{sometext}}** tells Angular to bind the value of the model "sometext" in its place. Finally, the **ng-show** directive conditionally shows an element, depending on the value of the relative boolean expression. It's default state is False, and one could also use **ng-hide**, which does exactly the opposite of **ng-show**.

##Hello React
Try to find or write a similar hello world using React

##Extra Practice
Refactor your cat app to use one of the frameworks.

##ToDo App
If you're done, start thinking about how you'll build your todo app for homework. With your group, discuss:
- Which framework do you want to use?
- How is what you're doing with a framework different from what you did with jQuery before?
- How will the server communicate with the client?
- On the board, map out the "boilerplate" for an app which uses a framework.
