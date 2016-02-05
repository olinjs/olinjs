## If you're still working on the homework:
- Selector practice
    + JSfiddles
- On the board, list as many methods for client/server communication as you can and compare/contrast them.
- On the board, draw a diagram which represents how an AJAX request works. Make sure you represent the client, the server, get/post requests, responses, data which is passed from client to server and from server to client... and what else?
- AJAX readings
    + a couple of them -- choose your own adventure
- Adding HTML to a page using jQuery
    + Here's a practice [JSfiddle](https://jsfiddle.net/swalters4925/e8gzd6h9/1/). AS always, please fork before editing!
- Show your group a problem you're trying to solve or a problem you think you solved in a particularly clever way. Get their feedback -- what did they do to solve the same problem? Do they understand things you don't, or vice versa? Do you have different mental models for the same thing?

### Pre-Populating Your Database 
Some of you have had questions about how to get data into your database as you work on developing your apps. There are two main methods we can suggest.

#### Faking It 
If you just need data to play around with your Handlebars templates or your JQuery selectors, it is really easy to create a fake data object to pass to Handlebars. When you hook the database up, you might need to reshape your data object a bit to get it to work with your Handlebars templating, but you know how to do that.

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


## If you're already done with the homework:
- Be a peer teacher for the day -- help the people around you with their burger apps. Helping someone else understand something can be a great way to solidify your own understanding.
- Check out this [WebSockets chat walkthrough](http://socket.io/get-started/chat/)
- Try this [LearnYouNode-style WebGL tutorial](https://github.com/stackgl/shader-school). WebGL is a JavaScript API for rendering interactive computer graphics.
- Learn about string pattern matching with this [LearnYouNode-style regex tutorial](https://github.com/substack/regex-adventure).
- Check out [jQuery UI](http://jqueryui.com/) and look at some of their interactive UI elements.  Try to implement some of the samples in your burger app
