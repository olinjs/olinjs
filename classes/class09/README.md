#Class 9 - Application Design and Diagramming

As we begin to develop larger and more complex applications, we'll want to start being methodical about how we design and plan them. 
Today we will talk about strategies for planning and documenting large applications to make developing and debugging as simple as possible.

##Planning

###Specifications
Writing a specification - or spec - for your application before you write any code can help not only you and your whole team understand the context for your application, but also serve as a road map for development.
As our applications grow in size and complexity, having a document to refer to can keep you on track with developing features and managing complexity.

As always, we defer to Wikipedia for an example of what a spec should contain such that it conforms to the *IEEE Standard for software specifications*.
Yes that is actually a thing.

- Introduction
 - Purpose
 - Definitions
 - System overview
 - References
- Overall description
 - Product perspective
   - System Interfaces
   - User Interfaces
   - Hardware interfaces
   - Software interfaces
   - Communication Interfaces
   - Memory Constraints
   - Operations
   - Site Adaptation Requirements
 - Product functions
 - User characteristics
 - Constraints, assumptions and dependencies
- Specific requirements
 - External interface requirements
 - Functional requirements
 - Performance requirements
 - Design constraints
   - Standards Compliance
 - Logical database requirement
 - Software System attributes
   - Reliability
   - Availability
   - Security
   - Maintainability
   - Portability
 - Other requirements

There is no hard and fast rule about how long a spec should be, but including all of that is just plain unnecessary for anything we'll be making in this class.
Instead, let's distill some of the key ideas from above that our specs should touch on.

***Disclaimer:*** Your teachers are by no means experts in writing specifications.
The suggestions offered below are just that.
The correct format will vary by project, so try to find what works best for you.

- **Overview:** The story of your application, justification for why it needs to exist, and a broad overview of what it will accomplish.
- **Use Cases:** What are some specific use cases you envision for the application?
Who will use it and for what?
- **User Interactions:** How will users interact with the software?
- **Requirements:** Specific features that the application should implement.
- **API/Feature Descriptions:** Specific details about functionality.
You might define routes and what you expect them to do, or font-end ui elements that should be present.
- **Test Cases:** How you plan to validate both your code and potentially the use cases?


###TDD
We learned a little bit about Test-Driven-Development last class, but we didn't go in to too much depth about using it for planning your application. 
If you really take your TDD seriously, you can treat your tests as a high-level specification for the functionality of your application. 
If you write all of your tests first, not only are you always validating your application, but you also have a fill-in-the-blank roadmap for development. 
How convenient!

###Diagramming
process example

####Logic Flow


####Interactions


####Network Layout


##Refactoring


###Folder Structure
```
MyApp/
+--public/
|  +--javascripts/
|     +--main.js
|  +--css/
|     +--main.css
|  +--images/
|     +--logo.png
+--views/
|  +--layouts/
|    +--main.handlebars
|  +--partials/
|     +--list_item.handlebars
|  +--index.handlebars
|  +--profile.handlebars
|  +--login.handlebars
+--models/
|  +--users.js
|  +--twotes.js
+--routes/
|  +--users.js
|  +--twotes.js
+--util/
+--app.js
+--package.json
```

##Exercise
Form groups of 4-5 people and select one of the following websites.
We're going to deconstruct these websites and design a simple specification for these sites as if we were going to implement them ourselves.
Don't worry about trying to capture all of the functionality of these sites and instead focus on a few core features that you might reasonably be able to implement at this time.
Expect to spend about 10-15 minutes on this exercise.

[Netflix](http://netflix.com/)

[Youtube](http://youtube.com/)

[Facebook](http://facebook.com/)

[Wikipedia](http://wikipedia.org/)

[Stack Overflow](http://stackoverflow.com/)
