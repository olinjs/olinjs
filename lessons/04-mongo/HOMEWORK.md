### Before Class 5 (Tuesday 2/2/16)
#### Assignment
For the homework, you will be integrating mongoDB into your Cat App from last class using mongoose. Now you can store the cats you create forever, and create new features that allow you to sort those cats in various ways.

For this homework, you will need to add at least one feature that integrates with your database and uses an advanced query. For example, you could only show cats in a certain age range, or display cats by date created.

In case you missed the in-class:
We're defining an advanced query as something that builds on basic queries by using query operators such as **and** and **or**. You can find a full list of query operators [here](https://docs.mongodb.org/manual/reference/operator/query/#query-selectors). You can also see examples of what that looks like in mongoose syntax at the main queries [doc page](http://mongoosejs.com/docs/queries.html) and in the [page](https://docs.mongodb.org/manual/tutorial/query-documents/) dedicated to building specific queries.

**Challenging:** Explore a more advanced concept of mongo/mongoose like embedding vs. referencing inside your cat application.

Other possible ideas would be integrating your cat app with a SQL database like mySQL or integrating with a remote database hosted on mongolab.

When you're finished, fill out [the Homework 4 submission survey](http://goo.gl/forms/ahznoQ3XeW).

#### Mongo Embedding vs Referencing
Let's say that you owned a series of bookstores each with a location,
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

#### Preclass Reading and Exercise
Read the [Class 5 README](https://github.com/olinjs/olinjs/tree/master/lessons/05-client-jquery-ajax). Follow along and build the app starting at the "HTML Forms" section to the end.

To complete the preclass, push the app you create during the "HTML Forms" section" to your fork of the Olin.js repo. Then, send an email to [olinjs16@gmail.com](olinjs16@gmail.com) with the subject line "Preclass 5" and a link to the GitHub folder containing your forms app. 

(The preclass is long -- if you can't get through all of it, at least get two forms working, then finish up the third in class).

If you're looking for an additional jQuery resource, this one is pretty good: [Basics of jQuery](http://jqfundamentals.com/chapter/jquery-basics).
