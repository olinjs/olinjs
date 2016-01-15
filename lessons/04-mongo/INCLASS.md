#Lesson 4 In-Class Exercises
Today we will be playing around with mongoDB by writing mongoose queries, before moving on to working with mongoose in your cat app.

##Queries in Mongoose
In mongoose, you create a schema to define the structure of your mongo collection. For this exercise, you will be working with a schema that has various robot features.

```javascript
var robotSchema = mongoose.Schema({
	name: String,
	abilities: [String],
  isEvil: Boolean
});
```

Create a few robots in the mongo shell and then launch your app on localhost. If the database is connected properly, your robot data should show up in your browser window.

With your group, write out a few queries to select certain robots, and test them in your in-class app.

##Advanced Queries
Now that you've got the basics of mongoose working, organize into groups and have each member research an advanced mongoose query to present to the group. You can implement this if you want, or move on to working on the cat app (where you will eventually need to implement an advanced query for this weeks homework).

##Cat App
Once you are comfortable with using mongoose in the scaffold application and building different types of queries, start working on integrating a database into your cat app. Follow the [getting started guide](http://mongoosejs.com/docs/index.html) that mongoose provides to hook the in-class app up to your database.

In groups, discuss the models you will use to store data for your cat app. It can be helpful to diagram your models on the board.

After you have decided on your model and created a schema, hook the cat creation route in your cat app up to mongoose. Once you have this working, try connecting your cat app to a partner's cat app database.
