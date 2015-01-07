#Class 6: APIs and Debugging Strategies
##APIs: Your *real* on-ramp to the information superhighway

![Take it to the moon, take it to the stars.](/images/tothemoon.jpg)

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
OAuth plays two roles in accessing data - *authentication* and *authorization*. 

Authentication is handled by assigning two unique values to each application that wants to use the service. These values are known as a **key** and a **secret**. The key serves as a public identifier for the application, and the secret is used to reversibly encrypt information about an OAuth API request. If the service provider is able to correctly decrypt this information with the secret it has assigned the application, it considers this verification that the requester is who it says it is. This method of authentication is known as signing.

Authorization occurs after your application has been authenticated by the service, and requires that you redirect the user to their OAuth authorization page. There, the service can authenticate the user using their own auth flow, and ask their permission to give you access to their data. If the users says yes, they are redirected back to you, and you get a special access token that allows you to request data specific to that user.

![Facebook authorization window](/images/facebook.png)
*Example authorization page for Facebook.*

You'll find that some services like Facebook have different levels of permissions, each of which will give you an access token which only allows access to data within each permission tier.

The full exchange of requests involved in OAuth can be seen in the graphic below. You can read more about OAuth on the [official website](http://oauth.net/), but I recommend this easy-to-follow, yet [comprehensive overview](http://www.cubrid.org/blog/dev-platform/dancing-with-oauth-understanding-how-authorization-works/).

![OAuth auth flow.](/images/oauth.png)
*Image via oauth.net*

###OAuth Exercise

##Passport and "Sign in using __"

##Designing APIs with REST-ful Semantics


###URLs

###GET and PUT

###POST

###DELETE

###Versioning with Accept headers


##Debugging
