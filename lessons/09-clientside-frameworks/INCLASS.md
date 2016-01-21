#Lesson 9 - Client-side Javascript Frameworks

##A Tie Breaker
Comparing React and Angular is a very interesting discussion. Both frameworks have pros and cons and examining those arguments in detail yields a tie breaker. 

##History
Angular has been around for a while. Since 2009, Angular has been assigning custom attributes, known as directives, to the HTML elements of the DOM to provide them with appropriate functionality. React is quite young. Born and sustained through Facebook in 2013, React has presented itself to the world as a performance-minded view renderer capable of rendering large amounts of data. Let's take a look at how those frameworks are different and, at the same time, so similar. 

##Virtual DOM
React uses VDOM, which results in much better performance than Angular rendering views. As thoroughly discussed [here](https://facebook.github.io/react/docs/glossary.html), ReactElements and their properties allow the user to alter elements using the virtual DOM. As noted, *a ReactElement is a light, stateless, immutable, virtual representation of a DOM Element*. 

##Binding	
Let's start with data binding. In Angular, one can only bind to scope. This essentially means that in complex scenarios, such as binding to a server, one will require an intermediate model in the way, as well as, one will have to take into account the handling of digest cycles in the process. On the other hand, React's beauty provides us with a *platform* for binding. A single attribute that takes into account both the *value* and the *onChange* properties of an object; namely, valueLink. For more information on data binding checkout the links for the respective framework:
- [React Data Binding](https://facebook.github.io/react/docs/two-way-binding-helpers.html)
- [Angular Data Binding](https://docs.angularjs.org/guide/databinding)

##JSX
In essence, JSX is a preprocessor step that adds XML syntax to JavaScript. One can definitely use React without JSX but JSX makes React a lot more elegant. JSX tags have a tag name, attributes and nested children. In addition to the above, XML has the benefit of balanced opening and closing tags. This helps make large trees easier to read than function calls or object literals. For more information on JSX, visit [here](https://facebook.github.io/react/docs/jsx-in-depth.html).

##Which one to use?
It is important to note that React can't stand as a framework on its own and *can* be wrapped in Angular. As afore-mentioned, there are both pros and cons in the use of either framework. An interesting read comparing Angular and React can be further found [here](https://medium.freecodecamp.com/angular-2-versus-react-there-will-be-blood-66595faafd51).


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

Angular 2.0 specifically, provides an interesting mechanism one can use to filter the bound information prior to presentation. One could also substitute the h1 tag above with the following, where "sometext" represents the expression and "uppercase" or "lowercase" the targetted filter.  

```html
<h1>Uppercase: {{ sometext | uppercase }}</h1>
<h1>Lowercase: {{ sometext | lowercase }}</h1>
```

##Hello Angular 2.0
Now that we saw how two-way data binding works on a simple html document, let's dive deeper into how we can create an app hosted locally and using Node and Angular. Let's check out the folder in Lesson 9 under the name "in_class_hello" that examines the use of directives and controllers in the context of Angular, by creating a simple app that moves between two pages with one click.  

##ToDo App 
Now that we have an idea of how those frontend frameworks work, let's get into pairs and think about how we would go about creating a more complicated ToDoList App. How would you go about structuring your application? The teaching team will wonder around and answer any questions you may have.

##Readings
Check out the following short excerpts online, comparing and analyzing the two frameworks:
- [A Closer Look into React by Pete Hunt](https://www.quora.com/profile/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look)
- [Why Build React?](http://facebook.github.io/react/blog/2013/06/05/why-react.html)
