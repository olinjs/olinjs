#Class 6
##Facebook Design Activity
You are designing Facebook's REST API. Come up with a set of routes to do everything Facebook does. When done, read and compare Facebook's API documentation to your mock API, and have a discussion in your group about what is different and what is the same?

##Simple Session App
Now we are going to practice managing sessions. Create a simple app that does the following:
* Redirects to /login if user tries to access / without logging in. 
* Lets a user login by entering their name into a form. 
* Redirects to / after login and displays "Hello [name]."
* OPTIONAL: display login time and/or number of times user has viewed page in addition to "Hello [name]."

##Aging Cookies
Discuss with your group the difference between a cookie and a session, and when are cookies and sessions created and destroyed. Play around with your app; how can you remove the session/cookie so the user has to login again?

##OPTIONAL: Production
We have not discussed creating/deploying apps for production yet, but it is important to highlight this. If you read the documentation of Express-session you saw something like: 

**Warning** The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

Lets try using a couple different session stores with our app. Pick two from the compatible list and integrate them into your app. 

**NOTE**: The choice of store will determine the difficulty of this exercise.  

If you have finished all of the above, start working on the homework for next time. 