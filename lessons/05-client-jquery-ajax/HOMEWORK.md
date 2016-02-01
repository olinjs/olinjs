
### Before Class 6 (Friday 2/5/16)
#### Assignment

Great news! We started shopping around your last two exercises (hope you don't mind)
and although no one was interested in buying your cat tracking software,
we did get an email from a local burger joint, looking for some help.
Jessica's Burgers is looking to update their aging ordering system to the 21st century.
So in an effort to ~~make us loads of cash~~ improve your coding skills,
this exercise will focus on making a web app which will help Jessica's customers
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
  * You may want to refer to the Mongo reading on [Referencing vs. Embedding](https://github.com/olinjs/olinjs/blob/master/lessons/03-express-templates-mongo/README.md) as you think about how you will store your data. 
  You should give your customer a nice congratulatory message for completing their order
  (maybe a free cat picture since you're so good at that?!)
  * A running counter of total cost: Should update whenever a new ingredient is added or removed.
* `/kitchen` =>
  * Shows a list of all pending orders.
  * A `completed` button beside each order that tells the server the order is complete.
  Clicking this should remove the order from the list of orders without refreshing the page.

When you're finished, fill out the [Homework 5 Submission Survey] (https://docs.google.com/forms/d/1MsGf_gNkHJBjBEzQoaUXvmpc3Nljk838FeBXlJ5hH9c/viewform?usp=send_form). 

#### Preclass Reading and Exercise
- Read the [Class 6 README](https://github.com/olinjs/olinjs/tree/master/lessons/06-css-development-style) before class 6 on Friday 2/5/16.

