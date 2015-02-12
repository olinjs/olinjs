#Homework 7

##Passport and "Sign in using __"
One of the great features of OAuth is that it allows us to use another service to authenticate users of our service. This means we can piggy back on someone else to handle the hard parts of signing in to a service. The library `Passport` makes this really easy, if not a bit complicated.

###Assignment
Read a little bit [about Passport](https://github.com/jaredhanson/passport/blob/master/README.md#passport), and then [this tutorial](http://mherman.org/blog/2013/11/10/social-authentication-with-passport-dot-js) they've linked in the documentation. You should aim to understand how to integrate Passport into an Express application to handle user sign in. Don't get hung up on the term 'Strategy,' it's just Passport's way of saying 'method of authentication.'

This week we're going to be using Twoter as a base for your homework and ask you to do the following things:

1.  Allow users to sign in to your service using Facebook
2.  Use Passport's LocalStrategy to sign users in with a username and password.
3.  **DO NOT PUSH YOUR OAUTH KEYS TO GITHUB**
4.  Only display Twotes on `/` if the user has been authenticated
5.  Try to keep all of you Passport logic out of `app.js` like we've been doing with all of our other routes. How might you go about this?
6.  Don't push to Heroku until we've had a chance to evaluate the functionality of Homework 6 separately. We will notify you when you can deploy.
6.  **DO NOT PUSH YOUR OAUTH KEYS TO GITHUB**


*Note: Please do all work on a separate branch from Homework 6. Yes, you can push a branch onto Heroku, just make sure you push it onto Heroku's master.*

####Getting set up with FB OAuth
In order to use Passport with Facebook, you'll need an application ID and secret key. You can get these by signing up as a developer on [Facebook's developer website](https://developers.facebook.com/) and creating a new application (under 'My Apps'). The only setting you will need to change for this application is to set 'Site URL' to `http://localhost:3000` so Facebook knows where to redirect OAuth requests. Note that when you deploy to Heroku, you will need to change this to your apps `herokuapp.com` address.

When we start working on projects, you might want to have a live version of your site deployed while you continue to work on it locally. In order to do this, you might consider having two Facebook applications: `my-app` and `my-app-dev`. Then you can set up your local application to use `my-app-dev`, and your deployed site to use `my-app`.

###Submission
After you've received the 'ok' to push your application to Heroku, fill out the [homework submission survey](http://goo.gl/forms/FeqpKu3ifj).
