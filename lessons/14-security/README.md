#Lesson 14 - Application Security

## README Table of Contents
* [Security](#security)
<!-- * [In-Class Activities](#inclass-14)
* [Homework](#homework-14) -->

<a name="security"></a>

------
#Security
Hello and welcome to possibly the most important lesson you will have in this course.
All of the applications you make and all of the websites that you put out into the world will be vulnerable to some sort of attack, and it's important for you to know what those attacks are, and how you can mitigate against them.
Before we get started, I'll take a moment to acknowledge one of the authoritative sources for all matters web security, [OWASP](https://www.owasp.org/index.php/Main_Page), the Open Web Application Security Project.
They've got in-depth explanations and mitigations for most of the known security vulnerabilities, including a handy [top 10 list](https://www.owasp.org/index.php/OWASP_Top_Ten_Cheat_Sheet). For React, here's an awesome article and recommendation for preventing XSS vulnerabilities: [here](https://medium.com/node-security/the-most-common-xss-vulnerability-in-react-js-applications-2bdffbcc1fa0#.o02ctm55c).

##Common Vulnerabilities
We'll cover some of the most common vulnerabilities here, but if you're going to be developing a production application, and especially handling any sensitive user data, you'll want to read through OWASP's website and make sure you're not leaving any glaring holes in your application.

##Script Injection
One of the most common and dangerous attacks on a website is what is known as a script injection.
This involves the attacker finding a way to get their code executing within the scope of your application, either on your servers, or being served up to your users on the client.
Let's look at some of the ways that can happen.

###XSS
A cross-site scripting (XSS) vulnerability is any vulnerability that allows an attacker some means of getting their code to be served by your application to another user.
How exactly this is accomplished depends on the application, but most commonly it is the result of submitting html or javascript through a form and having your application then render it in a page for someone else to execute.

###eval( )
We haven't yet talked about how or when to use the `eval()` statement in this class so let's do that now.
Don't use it.
`eval()` takes a string as it's argument and will evaluate it as JavaScript code.
If you avoid using it, that will help mitigate any possibility of arbitrary injected code from running on your servers.

###SQL/NoSQL Injection
If you've ever worked with a SQL database before you might be able to relate to this XKCD comic:

![Little Bobby Tables](http://imgs.xkcd.com/comics/exploits_of_a_mom.png)

SQL databases are queried with evaluated strings, which, if we're to learn anything from the previous paragraph, can lead to some less than desirable outcomes.
All it takes for someone to delete or poison your dataset is someone like Little Bobby Tables' mother with a vendetta against bad application developers.

Now, you might say to yourself "why, we're not using SQL databases, so we must be immune injection attacks. Ha ha ha. Ha ha. Ha."
That's right, laugh it up.
Keep laughing right up until you realize that MongoDB is queried with a structured JavaScript API that lends itself to [its own kind of injection](http://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html), as well as [arbitrary code execution](https://media.blackhat.com/bh-us-11/Sullivan/BH_US_11_Sullivan_Server_Side_WP.pdf) not just against your database, but potentially in your application as well! Many database abstraction layers (like Mongoose) inherently escape inputs to guard against inject attacks. These help to make development easier, but you should still code defensively against user inputs.

###Avoid Script Injection With Input Sanitization
The easiest way to prevent a script injection from happening in your application is to validate all inputs and catch any potential attacks.
There are [plenty](https://www.npmjs.com/search?q=sanitization) of npm [libraries](https://www.npmjs.com/search?q=sanitize) for both front end validation (this field expects a number, don't submit unless it is just a number), as well as back end sanitization (escape html tags and other special characters like `\/?(){}`). Check out OWASP's [super detailed rules](https://www.owasp.org/index.php/XSS_%28Cross_Site_Scripting%29_Prevention_Cheat_Sheet) for preventing XSS generally.

###Don't leak stack traces
Now, I'm going to preface this section by telling you a truth that most people struggle with and usually end up paying dearly for misunderstanding:
**[security through obscurity is a myth](http://en.wikipedia.org/wiki/Security_through_obscurity)**.
That is to say, your codebase can (and should) be entirely open source, and still be secure.
An attacker should not gain any benefit from knowing how your application is implemented.
If you ever think to your self, "hmm, this should be safe as long as no one ever finds out about this, and how could they," you're probably suffering from the delusion of security through obscurity.

So, with that said - assume our codebase and system details (software/library versions) are secret.
How can an attacker find vulnerabilities in your system?
By causing errors of course!
And if you're not careful about catching errors, they might get sent to the client containing information you might not want the user to see, including stack traces.
Stack traces can tell an attacker not only what your code is trying to do, but also what version of a particular library you are using, or even what version of node. If they know vulnerabilities in those systems, well now they know vulnerabilities in your system.

The standard express boilerplate uses the following code after all other routes to catch any internal errors and prevent them from showing up in a production environment.
This will catch any unexpected errors in express, but it's still up to you to catch any errors within your own routes and not send entire stack traces.
```js
// development error handler
// will print stacktrace
if (app.get('env') == 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err // the stacktrace
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {} // the lack of a stacktrace
  });
});
```

##Cross Site Request Forgery
Cross Site Request Forgery, or CSRF, is a way of hijacking an existing user session to get around authentication requirements and make route/API calls as users they don't have authorization from.
For example, suppose you're an attacker and you know of a banking website that has a form that submits a GET request to transfer money from one account to another.
You know that this bank stores user sessions in a cookie that doesn't expire in any short amount of time.
You send someone who you know uses this bank an email with a link that says it goes to one website, but really it sends a GET request to transfer $1,000,000 from their account to yours, with the browser automatically filling in the cookie header to authorize the request.
Jackpot!

What a terrible bank!
We'd never do something so silly as to transfer money with a GET request in *our* applications!
We *know* that that's something we'd always use a POST request for.
And so we do.
And so our attacker creates a webpage that when opened will automatically submit a POST request through AJAX in the background and use that same cookie to authenticate the transfer.
Now they just have to spam millions of people via email and hope some of them click the link to our website.

How can we get around this?
How can we prevent attackers from getting access to a browser's existing sessions?
One way is to do what most banks have resorted to these days, which is to just not keep sessions stored for longer than the duration of the user's visit to the website.
But that level of security won't fly for an application like Facebook, forcing users to constantly sign in.
Instead, we use what's known as a CSRF token.

A CSRF token is a randomly generated token that you send along to accompany every form on every page.
You store the tokens (usually in memory), and when you receive a POST request you check that it was sent back with the token you assigned to it.
If not, then send back an error in the response.
Now the only way to submit data or trigger an action on the server through an existing session is to include a  valid CSRF token.

###Samy the Myspace Worm
One of the greatest (and mostly harmless) examples of both XSS and CSRF in action in recent memory is that of Samy the Myspace worm.
In 2005, a man by the name of Samy Kamkar found an XSS vulnerability in Myspace that would allow him to inject JavaScript into his profile to trigger a CSRF vulnerability by anyone who visited it.
The CSRF request would send Samy a friend request as the viewer, as well as append the text "Samy is my hero" to the end of their profile.
Not only that, but it would in turn exploit the same XSS vulnerability, only this time injecting the code into the viewer's profile.
The effect is that within 24 hours, Samy had over a million friend requests and the FBI knocking at his door.
[Check out what Samy had to say about it.](https://www.youtube.com/watch?v=nC0i81eMLb8)

##Password Phishing
I'm sure we've all seen a phishing site at one time in our lives or another.
If you're unfamiliar, a phishing site is a web page designed to look exactly like the login page of another website, with the goal of getting an unwitting internet user to type their username and password for the actual website, and send it straight to the creator of the phishing page - unencrypted.
There's not much you can do to prevent phishing attacks from being successful on your users other than educating them as much as possible.
However, you can do your part by reporting any suspicious or definitely malicious websites to [OpenPhish](https://openphish.com/), which many browsers will check against to issue warnings to anyone attempting to visit them.

##Encrypt Sensitive Data
Rule number one of information security: **don't store sensitive data in plaintext**.
We've all seen the fallout many major companies have faced over the past couple of years because they stored emails, credit card data, passwords, etc. as plaintext.
Instead, they should have stored them as encrypted value.

We'll take a moment right here to digress and discuss how and why you can store only an encrypted version of a password.
[A recent article](https://neosmart.net/blog/2015/using-hmac-signatures-to-avoid-database-writes/) points out the distinction between the need to *store* a piece of information, from needing to *guarantee* a piece of information.
It should be obvious that when we want to store a piece of information we drop it into a database or file.
What might not be as obvious, is that when we want to guarantee something, we can use cryptography.

In the example of a password, the goal is really to guarantee that the authenticating user is who they say they are.
We can use cryptography to verify this, without ever having to store their plaintext password, or even ever un-encrypt their encrypted password.
Instead, we can simply store an encrypted version, and every time a plaintext password is sent along, re-encrypt it and verify that it matches the stored encrypted version.

To provide further protection against [rainbow tables](http://en.wikipedia.org/wiki/Rainbow_table) or other cracking schemes in the event of a database compromise, we can use different **one-time pads** known as the "salt" and "pepper."
A one-time pad is a piece of random data added to a piece of information before encryption to make decryption/cracking more difficult.
A pepper is a a random string of data concatenated to every piece of information, and a salt is a different random string of data, which is uniquely generated for each piece of data that gets encrypted.
So in a system using a salt and a pepper, we need to store the system-wide pepper, and keep track of which salt is used to encrypt which piece of information.
We won't at all get into the math behind the one-time pad, or how it adds cryptographic strength, but just trust us on this one.
It's one of those things you're better off just having.

To take this all one step further, you can make your encryption more secure by repeating your salting and hashing any number of times (think 100 to 100,000).
The point of the encryption - or hashing - step, is that it is one way in that it's not terribly slow to encrypt, but without a key it is exponentially slower to decrypt.
By repeating the process over and over, you're (kind of but not really) guaranteeing that no (modern) computer running any (publicly) known algorithm will crack your data before the heat death of the universe.
Doesn't that sound handy?

###Don't use Math.random( )
When generating encryption keys or other random information used for security purposes, never ever ever ever ever use `Math.random()`.
`Math.random()` will only generate pseudo-random numbers, and these numbers are not "cryptographically safe", as there are methods for recreating them given enough information about the conditions under which they were formed.

Instead, we will prefer to use `crypto.randomBytes()` from node's standard `crypto` library.
`crypto.randomBytes()` will generate "cryptographycally safe" random numbers (insofar as we know).
There is a lot that we don't yet know about cryptography, but we do know for certain that `Math.random()` is not good enough.

##SSL/TLS/HTTPS
At this point, you might be asking yourself, "how do we get the plaintext password/other sensitive data to the server without any spies on the network finding out?"
The answer to that is encryption and HTTPS!
HTTPS, or HTTP Secure as it's less commonly known, is a method for sending encrypted information over HTTP, where the only plain information is source and destination IP/Port pairs, as well as the length of the information being sent (though this can easily be obfuscated).

The standard protocol for encrypting information to be sent over HTTP is known as TLS, formerly SSL.
You'll probably still hear it referred to as SSL, and some sites still use it (though they really shouldn't), but the preferred protocol is whatever the latest version of TLS is.

TLS works by setting up a certificate, or cert, on the server which is a small file that a server can use to verify its authenticity to a client [(read more about how certs work here)](https://www.globalsign.com/en/ssl-information-center/what-is-an-ssl-certificate/).
When a client makes an HTTPS request of a server, the server must first send over its cert so that the client can decide whether or not it wants to trust the server.
If the client approves, the server then sends over a public encryption key that the client can use to encrypt the data it wants to send over.
Once the connection is established and the key exchanged, sensitive information can (we assume) be sent securely and privately over the internet.

Note that when you set up an application on heroku, by default it will not use HTTPS, and you need to manually  set up [SSL on Heroku](https://devcenter.heroku.com/articles/ssl-endpoint).

If you think this all sounds awesome and you want to learn more, check out [this awesome readable overview of how HTTP/TLS works](http://security.stackexchange.com/questions/20803/how-does-ssl-tls-work).

###Wireshark and Firesheep
Back in the wild west days of the internet, before the majority of websites knew to use HTTPS when transferring sensitive data between users and their servers, collecting login credentials was like shooting fish in a barrel for an attacker.
With tools like [Firesheep](http://en.wikipedia.org/wiki/Firesheep) and [Wireshark](https://www.wireshark.org/), an attacker can sit on a public network and sniff all of the traffic being sent on it.
Want a ton of Myspace passwords being sent over HTTP?
Go find a Starbucks, sniff all the packets on their wifi, set a filter for 'Myspace', and wait for someone on the network to sign in.
It was that easy!

Now that we all know better, so that's not really an issue.
There are probably some websites out there that don't use HTTPS for login pages or other pages containing private user data, and you should just avoid them altogether.
Most browsers will display a green padlock next to a URL if it's secured with TLS or SSL.

###Heartbleed
You might have heard about a very dangerous vulnerability called Heartbleed that was discovered in 2014, and that it had something to do with SSL.
The actual vulnerability was in OpenSSL, a *very* popular SSL library, and not the protocol itself (though other vulnerabilities have been found for SSL generally).
The Heartbleed bug in OpenSSL exploited the lack of a bounds check on a particular variable, which would allow an attacker to read arbitrary data stored in memory on a server and have it sent back through the SSL process.
You can see how this is less than desirable.
A patch was quickly put out, but there are still plenty of websites which still haven't updated.
If you're worried a service might be vulnerable to Hearbleed, just make sure it's not using versions 1.0.1 through 1.0.1f of OpenSSL.
