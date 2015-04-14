#Class 7: APIs and Debugging Strategies
##APIs: Your *real* on-ramp to the information superhighway

![Take it to the moon, take it to the stars.](./images/tothemoon.jpg)

*Get in loser, we're going to programmatically acquire JSON data.*

So we've spent some time making our own web services that deliver static and dynamic page content, and we've done it all with the semantics of REST (GET, POST, PUT, DELETE). Today we see how we can use REST APIs to deliver content other than webpages (data!), and how we can access existing APIs set up by some of our favorite websites. Let's get started.

##What's an API?
Generally the acronym API (Application Programming Interface) is used to describe the way in which one piece of software exposes some of its functionality for another piece of software to use. When we talk about APIs in this class we're going to be specifically referring to web APIs, which most commonly expose their functionality through a specific URL or set of URLs. The APIs we'll be working with will allow you to programmatically (read: without a browser) GET and POST data from 3rd party web services.

##Some Examples
There are a lot of APIs out there that give you access to more types of data than you'll ever know what to do with. You can check out a long but by no means exhaustive list [here](http://www.programmableweb.com/category/all/apis?data_format=21190). That's a lot of data sitting there for the taking!

###Twitter
Search for tweets and users, post statuses, read entire timelines (all tweets from a user's following list), and more. Useful for gathering large amounts of data for natural language processing, creating a better interface for twitter, analytics platforms, or tweeting bots! **Examples:** [Tweetbot Twitter client](http://tapbots.com/software/tweetbot/), [Tospy Analytics](http://topsy.com/analytics), [Pixelsorter Bot](https://twitter.com/pixelsorter)

>**URL Endpoint:** https://api.twitter.com/1.1

>**Data Format**: JSON

>**Account Creation:** Automatic key assignment

>**Auth Scheme:** OAuth 1.0a

>**Documentation:** https://dev.twitter.com/rest/public

###Last.fm
Get information on music artist, albums, and individual tracks. Get listening trend data, even venue and event info. You can also use this API to record users' track listens (called scrobbling) to Last.fm. **Examples:** [Tastebuds Music-based Dating](http://tastebuds.fm/), [Last.fm Extra Stats](http://www.last.fm/user/C26000/journal/2006/07/30/383m_last.fm_extra_stats), [Spotibot Playlist Generator](http://www.spotibot.com/)

>**URL Endpoint:** http://ws.audioscrobbler.com/2.0/

>**Data Format**: XML/JSON if requested

>**Account Creation:** Apply for key

>**Auth Scheme:** Proprietary

>**Documentation:** http://www.last.fm/api

###Dropbox
Access all your files stored online! Put them up, take them down, share them with others, read metadata and revision history. The possibilities really are endless on this one. **Examples:** [Filepicker upload plugin](https://www.filepicker.io/), [Gimmebar Browse Plugin](https://gimmebar.com/), [Droptunes Music Streaming](http://droptun.es/)

>**URL Endpoint:** https://api.dropbox.com/1

>**Data Format**: JSON & Various File Formats

>**Account Creation:** Automatic key assignment

>**Auth Scheme:** OAuth 1.0

>**Documentation:** https://www.dropbox.com/developers

###Netflix
This one should not be on the list of APIs. Sadly, they closed their public API last November. Let's all take a moment to boo Netflix. Booooooooo.

##Accessing Public APIs with OAuth
You might have noticed that some of the above APIs are listed as having an OAuth auth scheme, but you probably have no idea what that means. Sometimes, a 3rd party application might want access to private user data, but you can't reasonably expect web service providers to give that information out freely - we need a way for service providers' users to authorize 3d party applications to access their data. OAuth lets us do just that. **Note:** We're going to assume that throughout this class you will only be consuming APIs which require OAuth and not creating them.

###A brief overview of OAuth
OAuth plays two roles in accessing data - **authentication** and **authorization**. 

Authentication is handled by assigning two unique values to each application when they are registered with the service. These values are known as a **key** and a **secret**. The key serves as a public identifier for the application, and the secret is used to reversibly encrypt information about an OAuth API request. If the service provider is able to correctly decrypt the data sent along with the request using the secret it has assigned to the application, it considers this verification that the requester is who it says it is. This method of authentication is known as signing.

Authorization occurs after your application has been authenticated by the service, and requires that you redirect the user to their OAuth authorization page. There, the service can authenticate the user using their own auth flow, and ask their permission to give you access to their data. If the users says yes, they are redirected back to you, and you get a special access token that allows you to request data specific to that user.

![Facebook authorization window](./images/facebook.png)
*Example authorization page for Facebook.*

You'll find that some services like Facebook have different levels of permissions, each of which will give you an access token which only allows access to data within each permission tier.

The full exchange of requests involved in OAuth can be seen in the graphic below. You can read more about OAuth on the [official website](http://oauth.net/), but I recommend this easy-to-follow, yet [comprehensive overview](http://www.cubrid.org/blog/dev-platform/dancing-with-oauth-understanding-how-authorization-works/).

![OAuth auth flow.](./images/oauth.png)
*Image via oauth.net*

###OAuth Exercise
We have an small example application using OAuth in the `word_cloud` folder in this class that will use Twitter's API to generate a word cloud. This example will show you how to build an OAuth request from scratch. While we hope you won't have to do that out in the real world unless absolutely necessary, we thought it might be nice to show you one so you can appreciate all of the heavy lifting some of the OAuth libraries take care of for you.

##Designing APIs with REST-ful Semantics
Up until now, we've only had experience using URL routes that we created ourselves, all used for interacting with web pages. In this lesson, we've started exposing you to APIs other people have designed specifically for you to use. What about when *you* want to create an API for *other people* to use? We won't go into detail about picking what kind of data or functionality to expose, as that will vary based on your application, but what we will cover is _how_ to expose that data and functionality in a way that is easy for others to understand and use.

###GET and PUT
When designing a REST API, it's best to think of GET and PUT routes as reciprocal methods. When you ask to PUT a resource at a specific route, you should get that same resource back when you GET it. Of course, this really only applies to those routes in which we match some identifier for a resource (like `/cats/bycolor/:color` in homework 3). As an example, suppose we have a messaging website that has a unique id for every message created. We can see any specific message through our API by GET-ing `/messages/:id`. Similarly we could update a message by PUT-ing the updated information to `/messages/:id`.

###POST
One thing a lot of people struggle with is knowing when to use POST vs. PUT. If you think of the example above, however, it should be pretty obvious to you. If PUT is used for putting a resource at a route, a POST request is used for any route where you might want do something that modifies the database or server in some way, but not in a way that is reciprocal with a GET request. For example, you could provide a single route for creating messages `/messages/new`, which will take care of making a message that could then be GET-ed and PUT-ed by its assigned id. You can't really think of any reasonable reciprocal for `/messages/new`, can you? It wouldn't make sense to return the last message created, so we would just have the one method available on routes like that.

###DELETE
Probably the most self-explanatory method available to us. DELETE requests should only be used when we want to remove the resource at the URL we send the request to. Say we accidentally sent a _really_ embarrassing message to one of our professors. With a DELETE request we can make sure that `/messages/:embarrassing_message_id` returns a 404 by getting rid of the message altogether. Crisis averted!

###Naming Routes
To get started designing an API, you're going to need to come up with some routes that describe the content or functionality we are going to provide. One strategy we will try to stick to throughout the course is using **semantic routes**. This means that you should read the route, along with the method you'll use to request it, and from that alone have a good idea of what the result will be. What would you expect the following requests to do?

```
POST /blog/new
```
```
POST /login
```
```
GET /teacher/evan.simpson
```
```
DELETE /cats/age/15
```

Let's look at what's going on here. We'll start by examining the first part of the path, which we call the **collection**. Yes, this encompasses the same concept of collection as in MongoDB, but it is just a (convenient) coincidence we call them both that. Some collection routes we've used in the past include `/cats`, and `/ingredients`, and they describe the type of resource we are trying to access or manipulate. The next part of our paths will generally specify the action or resource, like `/cats/new` or `/ingredients/:name`. We can add specificity by extending a route as in `/cats/bycolor/:color`. Now of course, since we've been showing you the right way to create routes since the beginning, it's likely none of this is news to you, so let's look at some examples of bad, non-semantic URLs so you can appreciate the good ones. As always, Wikipedia has some great examples:

Non-semantic URL | Semantic URL
---------------- | --------------
`http://example.com/index.php?page=name` | `http://example.com/name`
`http://example.com/index.php?page=consulting/marketing` | `http://example.com/consulting/marketing`
`http://example.com/products?category=2&pid=25` | `http://example.com/products/2/25`
`http://example.com/cgi-bin/feed.cgi?feed=news&frm=rss` | `http://example.com/news.rss`
`http://example.com/services/index.jsp?category=legal&id=patents` | `http://example.com/services/legal/patents`
`http://example.com/kb/index.php?cat=8&id=41` | `http://example.com/kb/8/41`
`http://example.com/index.php?mod=profiles&id=193` | `http://example.com/profiles/193`
*Source: http://en.wikipedia.org/wiki/Semantic_URL*

Now if we combine everything we've learned about REST methods, semantic paths, and Wikipedia being a great resource for explaining things graphically, we get something like the following table.

Resource | GET | PUT | POST | DELETE
---------|-----|-----|------|-------
**Collection URI**, such as http://example.com/resources/ | List the URIs and perhaps other details of the collection's members. | Replace the entire collection with another collection. | Create a new entry in the collection. The new entry's URI is assigned automatically and is usually returned by the operation. | Delete the entire collection.
**Element URI**, such as http://example.com/resources/item17 | Retrieve a representation of the addressed member of the collection, expressed in an appropriate Internet media type. | Replace the addressed member of the collection, or if it doesn't exist, create it. | Not generally used. Treat the addressed member as a collection in its own right and create a new entry in it. | Delete the addressed member of the collection.

*Source: http://en.wikipedia.org/wiki/Representational_state_transfer*

###Versioning with Accept headers
One thing you almost always see API providers doing in a way that is not semantic is specifying the version of the API to be used for the request by prefixing it to the resource route. Can you guess why this isn't semantic? That's right - the route is supposed to describe the resource, and our API version does not (or should not) do that. Thankfully, we know better than that, so where else can we put it? In the HTTP headers! Specifically the `Accept` header. The API version value would look something like `application/vnd.myapp.v1`, added to whatever values need to be sent in the `Accept` header. Then in our application, we can check it easily with the `accepts` package (install via npm):
```js
var accepts = require('accepts');

app.use('/api*', function(req, res, next) {
  var accept = accepts(req);
  if (accept.types('application/vnd.myapp.v1')) {
    next();
  } else {
    return res.json(400, {
      message: "Incorrect API version"
    });
  }
});
```

###Can I set up my own OAuth server?
So you want to use OAuth to authenticate and authorize your API users, huh? Unfortunately that's _just_ outside the scope of this class, but know that if you do get to that point someday, there are some great packages available (on npm) that can help you get a basic setup running fairly quickly.

_If this readme hasn't been enough for you and you want more REST, feel free to check out [this cool guide](http://www.infoq.com/articles/rest-introduction) on your own time._
