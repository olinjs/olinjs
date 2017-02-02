# The Client and Burger Application Continuation:

## README Table of Contents
* [In-Class Activities](#inclass-05)
* [Additional Readings and Information](#help-05)
* [Homework](#homework-05)

<a name="inclass-05"></a>
#Lesson 5 In-Class Exercises

## Whiteboarding
- On the board, draw a diagram which represents how an AJAX request works. Make sure you represent the client, the server, get/post requests, responses, data which is passed from client to server and from server to client... and what else?
- On the board, list as many methods for client/server communication as you can and compare/contrast them.

### Real Life Selector Practice
- We are going to play around with the twitter homepage using jQuery
- Work in a group and list out all of the commands that you come up with on the whiteboard, next to a description of what it did.
- First, open [twitter](https://twitter.com) in an incognito tab, you should see a grid of popular tweets. Now click on "view all" in the Moments section.
- Now lets open up the console and have some fun
    - Use the elements pane of the console to explore how the page is set up. What are the classes you could use to [**select**](https://learn.jquery.com/using-jquery-core/selecting-elements/) all the tweets? A single tweet? The retweet count on a single tweet?
    - Select the [**first**](https://api.jquery.com/first/) tweet, change it so that so that it has 9001 likes and -10 retweets
    - Change the [**text**](https://api.jquery.com/text/) content of that tweet
    - Attach a [**mouseover**](https://api.jquery.com/mouseover/) event to [**each**](https://api.jquery.com/children/) of the tweets in the whole page.
    - [**clone**](https://api.jquery.com/clone/) the first tweet, change the image to be one of your choosing and add it back to the DOM [**before**](https://api.jquery.com/before/) the tweet you cloned

## AJAX readings
- A couple of readings (in ascending order of read time), choose the ones that appeal to you.
  - [learn jQuery: Ajax](https://learn.jquery.com/)
  - [TutorialsPoint jQuery Ajax](http://www.tutorialspoint.com/jquery/jquery-ajax.htm)
  - [jQuery Fundementals: Ajax](http://jqfundamentals.com/chapter/ajax-deferreds)

## Adding HTML to a page using jQuery
- [Sample Exercise](https://jsfiddle.net/swalters4925/e8gzd6h9/1/)

<a name="help-05"></a>
#Additional Information
We went over the confusions and questions that you all had that we hadn't really addressed, and wanted to provide answers and resources for all of you, regarding them and other useful information.

###Pre-Populating Your Database
Some of you have had questions about how to get data into your database as you work on developing your apps. There are two main methods we can suggest.

####Faking It
If you just want data in your database so you can play around with formatting your Handlebars templates or JQuery selectors, it is really easy to fake what your data would look like by creating an object to pass to Handlebars. The one caveat with this approach is that your database output might not look exactly like you expect, but once you have something that works with Handlebars, you can format the data from the database in the same pattern.

To implement this, you just pass your fake data object to Handlebars in `res.render`:

```javascript
res.render(‘ingredients’, {ingredients : [
  {name: 'Tomato',
   price: '1' },
  {name: 'Sriracha',
   price: '2' }
]});
```

Now you can play around with your fake data on the front end of your app until you are ready to move forward to working with a database.

#### Create An Add Route
You will eventually need a way to add initial information to your database for real. This will usually look a lot like the "new cat" route from your cat app. For the purpose of populating your database, you can make an array of random ingredient names and a random number generator and have your app save a randomly generated ingredient every time you go to your "new ingredient" route. Alternatively, you can hook a simple client-side "add ingredient" form up to the "new ingredient" route on the server. Hint: this would look a lot like the POST route from the class five readme, but with the added functionality of saving the data you receive in `req.body` to your database.

#### Mongoose Practical Uses and Comparison with Others


### Share your Problems
Show your group a problem you're trying to solve or a problem you think you solved in a particularly clever way. Get their feedback -- what did they do to solve the same problem? Do they understand things you don't, or vice versa? Do you have different mental models for the same thing?

# Further Readings and Exercises:
- Check out this [WebSockets chat walkthrough](http://socket.io/get-started/chat/)
- Try this [LearnYouNode-style WebGL tutorial](https://github.com/stackgl/shader-school). WebGL is a JavaScript API for rendering interactive computer graphics.
- Learn about string pattern matching with this [LearnYouNode-style regex tutorial](https://github.com/substack/regex-adventure).
- Check out [jQuery UI](http://jqueryui.com/) and look at some of their interactive UI elements.  Try to implement some of the samples in your burger app

<a name="homework-05"></a>
# Before Class 6 (Friday 2/7/17)

## Burger App Part 2
For Tuesday, complete your burger app by adding the following http endpoints:
* `/order` =>
  * Shows a form which allows customers to create a new burger.
  * There should be a [checklist](http://www.w3schools.com/tags/att_input_type.asp) of all ingredients and their price.
  * Out-of-stock ingredients should have a disabled checkbox (`<input type="checkbox" disabled>`)
  * There should be a Submit button that will send the server the new order without refreshing the page.
  * You may want to refer to the Mongo reading on [Referencing vs. Embedding](https://github.com/olinjs/olinjs/blob/master/lessons/02-express-templates-mongo/README.md) as you think about how you will store your data. You should give your customer a nice congratulatory message for completing their order (maybe a free cat picture since you're so good at that?!)
  * A running counter of total cost: Should update whenever a new ingredient is added or removed.
* `/kitchen` =>
  * Shows a list of all pending orders.
  * A `completed` button beside each order that tells the server the order is complete. Clicking this should remove the order from the list of orders without refreshing the page.

If you want to challenge yourself, feel free to add additional functionalities to your burger application. Even though we haven't talked too much about CSS, if you're interested in beautifying your app, feel free to do so (bootstrap might be a good start if you aren't too familiar with styling).

When you're finished, fill out the [Homework 5 Submission Survey] (https://docs.google.com/forms/d/e/1FAIpQLSfa_Ia5YbvwsdJ8qfe0-i3Fi-KFsgdbwiczYpR4fe7tvxCQsw/viewform).
