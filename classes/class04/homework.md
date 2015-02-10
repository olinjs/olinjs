# Homework 4
In this homework we will start by exploring a new aspect of MongoDB
and then we will start incorporating AJAX into a web app in order to make it
more dynamic and easy to use.
## Reading
### Mongo Embedding vs Referencing
Let's say for example that you owned a series of bookstores each with a location,
a manager, and tons of books. Each book has an author and a price.
So our data structure so far looks like:
```
bookstore
  location
  manager
  book
    author
    price
```
Keep in mind that a lot of books will be repeated across bookstores.
How would we convert this to a Mongo datastore?
Perhaps the obvious solution would be to just throw it all into an object that looks like the above.
This is called **embedding** and is one of two ways that Mongo allows us to store objects within other objects.

**Embedding** is when you store a Mongo document inside of another Mongo document.
This is the default way to do things in Mongo, and is the most obvious.
Instead of creating two collections for your bookstore,
you'll just have one bookstore collection that has a list of every book inside of the bookstore.
```
bookstore
  location
  manager
  book
    author
    price
```

This will lead you to repeat books across bookstores (but who cares because space is cheap).
However, it will also mean that if you want to change the price of a book across all bookstores you have to go through each bookstore,
search for the book, then change the attribute of the book.
This isn't too bad if the book changes price very rarely, or if there are only a few stores which stock the book.
However, think back to the Amazon.com example.
If the price of the book changes every hour, and 1000 bookstores stock the book,
you now have to update 1000 objects every hour.
This becomes an even bigger problem when you're a product like Twitter and your
"bookstores" are users and books are people those users follow. Let's say you want
to update information about the book "Lady Gaga", which is stocked by 33 million "bookstores".
This would be nearly impossible with embedded data, but is a cinch with references.

The other method of putting objects within other objects is called **referencing**.

**Referencing** is when you reference a Mongo document (usually by _id)
inside of another document.
We could split up the `bookstore` into two separate Mongo collections,
a `store` and a `book`.
Then our collections will look like:
```
store
  location
  manager
  items
```
```
book
  author
  price
```
This decouples stores with what they carry.
We now have 1 book object that can be referenced from multiple stores.
This is useful when you are lacking in space (because you don't repeat books).
It is also useful when the object being shared changes often.
Imagine that this bookstore based the price of their books on the Amazon.com price of the book (which fluctuates constantly).
Now every time the price of the book changes you have to make only one change to one object,
and the next time a store looks up the book it will see the updated price.



In the end which way you use (reference or embedding) depends what your data access patterns will be like.
You'll likely be using embeds 80% of the time, but references also have their place, so know how to do both.

The Mongo documentation has further details about [when to embed vs reference](http://docs.mongodb.org/manual/core/data-model-design/).

## Assignment

Great news! We started shopping around your last two homeworks (hope you don't mind)
and although no one was interested in buying your cat tracking software,
we did get an email from a local burger joint, looking for some help.
Jessica's Burgers is looking to update their aging ordering system to the 21st century.
So in an effort to ~~make us loads of cash~~ improve your coding skills,
this homework will focus on making a web app which will help Jessica's customers
get their delicious burgers even quicker (and more delicously).
Your application will allow users to build orders for a single burger from a list of ingredients
(which will need to be updated as new stock arrives).
Then it will allow Jessica's chefs to see all the pending orders, fill them, and alert customers that their burger is ready.

Your application will need the following http endpoints:
* `/ingredients` =>
  * Shows a list of current ingredients (Name and Price) with Out-of-Stock and edit button.
  * An `Add` button should allow the user to specify the name and price of a new ingredient which should appear on the page without requiring a refresh.
  * Out-of-Stock button will tell the server to label the ingredient as disabled.
  The ingredient should be removed from the current page without refreshing.
 (Optional: make it toggleable to "add" more of the ingredient.
In this case, do not remove the ingredient from the page, but make note through words or style that it is unavailable.)
  * Edit button allows the user to submit a new name or price for the ingredient
  which the server will update. The edits should change the ingredient list without refreshing.
* `/order` =>
  * Shows a form which allows customers to create a new burger.
  * There should be a [checklist](http://www.w3schools.com/tags/att_input_type.asp) of all ingredients and their price.
  * Out-of-stock ingredients should have a disabled checkbox (`<input type="checkbox" disabled>`)
  * There should be a Submit button that will send the server the new order without refreshing the page.
  You should give your customer a nice congratulatory message for completing their order
  (maybe a free cat picture since you're so good at that?!)
  * A running counter of total cost: Should update whenever a new ingredient is added or removed.
* `/kitchen` =>
  * Shows a list of all pending orders.
  * A `completed` button beside each order that tells the server the order is complete.
  Clicking this should remove the order from the list of orders without refreshing the page.

### Submission

Deploy your application to Heroku and fill out the [homework submission survey](http://goo.gl/forms/Ibq7ELqBfS)
