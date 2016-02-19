#Lesson 9 - Client-side Javascript Frameworks

##Angular vs. React
Angular has been around for a while. Since 2009, Angular has been assigning custom attributes, known as directives, to the HTML elements of the DOM to provide them with appropriate functionality. React is quite young. Born and sustained through Facebook in 2013, React has presented itself to the world as a performance-minded view renderer capable of rendering large amounts of data. 

- Find Angular and React documentation online. Pay particular attention to the following keywords: virtual DOM, two-way data binding, JSX, controllers/services/directives, . Which keywords are relevant to which framework? How are the frameworks similar? How are they different?

Here are some links to start you out:
- [Angular Conceptual Overview](https://docs.angularjs.org/guide/concepts)
- [Angular Data Binding](https://docs.angularjs.org/guide/databinding)
- [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [A Closer Look into React by Pete Hunt](https://www.quora.com/profile/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look)
- [Why Build React?](http://facebook.github.io/react/blog/2013/06/05/why-react.html)

###Which one to use?
It is important to note that React can't stand as a framework on its own and *can* be wrapped in Angular. As afore-mentioned, there are both pros and cons in the use of either framework.

##Hello Angular 1.0
In it's simplest form, one can use the code provided below to asynchronously update and place the content from the textbox to complete the period next to "Hello".
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

##Extra Practice
Refactor your cat app to use one of the frameworks.

##ToDo App 
If you're done, start thinking about how you'll build your todo app for homework. With your group, discuss:
- Which framework do you want to use?
- How is what you're doing with a framework different from what you did with jQuery before?
- How will the server communicate with the client?
- On the board, map out the "boilerplate" for an app which uses a framework.
