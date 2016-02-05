## If you're still working on the homework:
- On the board, draw a diagram which represents how an AJAX request works. Make sure you represent the client, the server, get/post requests, responses, data which is passed from client to server and from server to client... and what else?
- On the board, list as many methods for client/server communication as you can and compare/contrast them.
- Selector practice
    + JSfiddles
- AJAX readings
    + a couple of them -- choose your own adventure
- Adding HTML to a page using jQuery
    + JSfiddle
- Show your group a problem you're trying to solve or a problem you think you solved in a particularly clever way. Get their feedback -- what did they do to solve the same problem? Do they understand things you don't, or vice versa? Do you have different mental models for the same thing?

###Pre-Populating Your Database 
Some of you have had questions about how to get data into your database as you work on developing your apps. There are two main methods we can suggest.

####Faking It 
If you just want data in your database so you can play around with formatting your Handlebars templates or JQuery selectors, it is really easy to fake what your data would look like by creating an object to pass to Handlebars. The one caveat with this approach is that your database output might not look exactly like you expect, but once you have something that works with Handlebars, you can format the data from the database in the same pattern.

To implement this, you just pass your temporary object to Handlebars in res.render:

```javascript
res.render(‘ingredients’, {ingredients : [
  {name: 'Tomato',
   price: '1' },
  {name: 'Siracha',
   price: '2' }
]});
```

Now you can play around with your fake data on the front end of your app until you are ready to move forward to working with a database. 

####Create An Add Route
You will eventually need a way to add initial information to your database for real. You can think of this method as what you did in your cat app with the ‘new cat’ route. For the purpose of populating your database, you can make an array of random ingredients and a random number generator and have your app save that as ingredient data every time you go to that route. Alternatively, you can start by implementing the addIngredient’s route on the front end and have the data you enter into a form POST to the server and populate your database. Hint: this should look a lot like the POST route from the class five readme, but with the added the functionality of saving the data you receive in req.body to your database.


## If you're already done with the homework:
- Be a peer teacher for the day -- help the people around you with their burger apps. Teaching can be a great way to solidify your own understanding.
- Check out this [WebSockets chat walkthrough](http://socket.io/get-started/chat/)
- Try this [LearnYouNode-style WebGL tutorial](https://github.com/stackgl/shader-school). WebGL is a JavaScript API for rendering interactive computer graphics.
- Learn about string pattern matching with this [LearnYouNode-style regex tutorial](https://github.com/substack/regex-adventure).
