# Application Design and Diagramming

As we begin to develop larger and more complex applications, we'll want to start being methodical about how we design and plan them.
In this lesson we will talk about strategies for planning and documenting large applications to make developing and debugging as simple as possible.

## Planning

### Specifications
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


### TDD
We learned a little bit about Test-Driven-Development before, but we didn't go in to too much depth about using it for planning your application.
If you really take your TDD seriously, you can treat your tests as a high-level specification for the functionality of your application.
If you write all of your tests first, not only are you always validating your application, but you also have a fill-in-the-blank roadmap for development.
How convenient!

### Diagramming
Many of us understand systems better when we're able to visualize them.
To this end, diagramming different aspects of your application can be a very effective means of creating an easy to understand, meaningful representation.
In the past you might have used tools like PowerPoint or Visio to create flow charts or UML diagrams, but in this class we're rocking our Windows-free dev environments, so let's check out [draw.io](http://draw.io).
draw.io is a cool web-based application that offers a lot of nice tools for making process diagrams and flow charts like the one below, check it out!

![Example diagram from draw.io](images/draw_example.png)

We aren't going to require any one specific type of diagram for your projects in this class.
Instead, we're going to recommend a couple of different options that you might consider diagramming for managing complexity in your application.
Let's look at things you might consider diagramming.

#### Logic Flow
if your application involves a lot of different routes and middleware, you might consider mapping how a request moves through your application.
As an example, let's look at how we might diagram a simple application with a few routes and a few pieces of middleware.
![Example application logic flow](images/app_flow.png)
If we follow a request in from the user, we can clearly see how it moves through the router to a route, which routes need to access our database, and which ones redirect.
You can pick and choose which components inside your application you choose to represent, but make sure that the amount of information you show is useful.
Too much information and the diagram might be difficult to follow, too little and it might not be useful, or could even be misleading.

#### Interactions
If you anticipate having a lot of different interfaces you might want to create a diagram that represents what the user will see happen in response to certain actions.
You might find it easier to draw these out by hand at first, or use a tool like [balsamiq](https://balsamiq.com/) or [inVision](http://www.invisionapp.com/), but don't think you need a high resolution representation to make something of value.
![](http://www.seanlemme.com/assets/img/portfolio/nurse2.png)
*Image via seanlemme.com*

#### Network Layout
If you ever get to the point that you're working on a *really* big application that's distributed across multiple different severs, you'll need to start diagramming a map of all of your different servers, databases, and other networked components, and how they all connect.
We'll never get around to anything remotely close to the system shown below (in fact I'd be surprised if anyone has a configuration like that), but the principle is still there.
![AWS network layout](images/AWSexample.png)

## Refactoring
As you develop (or let's be honest - have been developing), you might find yourself doing hacky things just to get your code to work.
Avoid this if you can.
However if you do, it's valuable to take a few minutes to **refactor** your code.
If you're unfamiliar with this term, refactoring basically refers to restructuring how your code is laid out across files, functions, modules, etc. without necessarily modifying any functionality.
In order for you to be effective at refactoring, let's go through a typical folder structure for one of our applications and look at what goes where.

### Folder Structure
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
+--tests/
+--app.js
+--package.json
```

`public/` We all know that we've been using this folder to host all of our front-end javascript, css, and any other static content we want the user to have direct access to.
What we failed to mention before is what does **not** belong here.
Any files that you do not want your users to have public access to - files with secret keys, proprietary application logic, or authentication flow - should by no means end up here.
We name this folder public for a reason - everything in it is publicly available.

`views/` Again, we've gotten pretty good at this one. Keep all of your handlebars templates, layouts, and partials here.
If the top level starts to get out of hand with too many templates, consider creating subfolders for logical groups of templates.

`models/` This folder should be the keeper of all of your database models, or schemas.
Good practice is to have one file per model or schema, rather than keep them all in the same one.
Again, it might have been easier up until now to put all of your small schemas in the same file, but looking ahead, you'll be doing yourself a huge favor if you start getting used to separating things into their own files.

`routes/` We haven't seen very many issues with people catching on to using this folder properly.
In general, you'll want a separate route file for each schema you have, to contain that particular item's collection of routes.
You might also have a collection of generic application routes that aren't necessarily tied to any one model item.
From time to time you might also see or hear this folder referred to as controllers rather than routes.
For now, consider the two interchangeable.

`util/` This can be a generic catch-all folder for housing any utility scripts you might have that don't fit in to any of the other categories.
As an example, we saw many people creating scripts for generating random cat names in a previous homework.
This folder would be a great place to put that script.

`tests/` Pretty self-explainatory - keep all of your test scripts in this folder.

So there we have it - some simple guidlines for keeping your application neat and orderly.

## Exercise
Select one of the following websites.
We're going to deconstruct these websites and design a simple specification for these sites as if we were going to implement them ourselves.
Don't worry about trying to capture all of the functionality of these sites and instead focus on a few core features that you might reasonably be able to implement at this time.
Expect to spend about 20-30 minutes on this exercise.

[Netflix](http://netflix.com/)

[Youtube](http://youtube.com/)

[Facebook](http://facebook.com/)

[Wikipedia](http://wikipedia.org/)

[Stack Overflow](http://stackoverflow.com/)
