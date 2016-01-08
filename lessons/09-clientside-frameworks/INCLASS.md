#Lesson 9 - Client-side Javascript Frameworks

##A Tie Breaker
Comparing React and Angular is a very interesting topic. Both frameworks have pros and cons and examining those arguments in detail yields a tie breaker. 

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
Both frameworks can be complementary to each other. If you are choosing to build a web application, it is important that you leverage new tooling, which can increase the quality of your brand interactions and decrease development time by leveraging existing libraries or frameworks. If your application has a lot of large data operations and dynamic content, **React** is an excellent addition to the stack. The downside to using both frameworks is that it can increase complexity within the application.

##Readings
Check out the following short excerpts online, comparing and analyzing the two frameworks:
- [A Closer Look into React by Pete Hunt](https://www.quora.com/profile/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look)
- [Why Build React?](http://facebook.github.io/react/blog/2013/06/05/why-react.html)
