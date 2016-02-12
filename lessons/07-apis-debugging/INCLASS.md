#Class 7
##Facebook Design Activity
You are designing Facebook's Page API. Come up with a set of routes to "Publish and send content as a Page. Manage Facebook Pages from your app." (Facebook's Page API documentation). When done, read and compare [Facebook's API](https://developers.facebook.com/docs/pages) documentation to your mock API, and have a discussion in your group about what is different and what is the same.

##Simple Session App
Create a simple app that does the following:
* Redirects to /login if user tries to access / without logging in. 
* Lets a user login by entering their name into a form. 
* Redirects to / after login and displays "Hello [name]."
* OPTIONAL: display login time and/or number of times user has viewed page in addition to "Hello [name]."

If you'd like to see how we implemented a simple session app, check out [this example](https://github.com/olinjs/olinjs/tree/master/lessons/07-apis-debugging/sessionExample).

##Aging Cookies
Discuss with your group the difference between a cookie and a session, and when are cookies and sessions created and destroyed. Play around with your app; how can you remove the session/cookie so the user has to login again?

##Passport Example
Check out the [Passport example](https://github.com/olinjs/olinjs/tree/master/lessons/07-apis-debugging/passportExample) -- pull it and follow the instructions in the readme in that folder to get it running.

Read through the code -- what makes sense to you? What's confusing? How will you add Passport to Twoter?

##OPTIONAL: Production
We haven't discussed creating/deploying apps for production yet, but it is important to highlight the following point. If you read the documentation of   `express-session` you might have seen something like: 

**Warning** The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

Let's try using a different session store with our app. Since we have MongoDB set up already, integrate one of these two stores into your app.
    - [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session)
    - [connect-mongo](https://www.npmjs.com/package/connect-mongo) 
  
If you have finished all of the above, start the homework for next time (adding Passport to Twoter).
