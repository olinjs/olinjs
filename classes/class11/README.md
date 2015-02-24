#Class 11 - Application Security

##Common Vulnerabilities

[OWASP website](https://www.owasp.org/index.php/Main_Page)

[OWASP Top 10](https://www.owasp.org/index.php/OWASP_Top_Ten_Cheat_Sheet)

##Script Injection
One of the most common and dangerous attacks on a website is what is known as a script injection.
This involves the attacker finding a way to get their code executing within the scope of your application.
Let's look at some of the ways that can happen.

###XSS
A cross-site script (XSS) vulnerability is any vulnerability that allows ann attacker some means of getting their code to be served by your application to another user.
How exactly this is accomplished depends on the application, but make sure you know what this acronym means, and read on for some examples of how it might happen to your application.

###eval( )
We haven't yet talked about how or when to use the `eval()` statement in this class so let's do that now.
Don't use it.
`eval()` takes a string as it's argument and will evaluate it as JavaScript code.
If you avoid using it, that will help mitigate any possibility of arbitrary injected code from running on your servers.

###SQL/NoSQL Injection
If you've ever worked with a SQL database before you might be able to relate to the XKCD comic below.

![Little Bobby Tables](http://imgs.xkcd.com/comics/exploits_of_a_mom.png)

SQL databases are queried with evaluated string queries, which, if we're to learn anything from the previous paragraph, can lead to some less than desirable outcomes.
All it takes for someone to delete or poison your dataset is someone like Little Bobby Tables' mother with a vendetta for against bad application developers.

Now, you might say to yourself "why, we're not using SQL databases, so we must be immune injection attacks. Ha ha ha. Ha ha. Ha."
That's right, laugh it up. Keep laughing right up until you realize that MongoDB is queried with a structured JavaScript API that lends itself to arbitrary code execution not just against your database, but potentially in your application as well!

###Avoid Script Injection With Input Sanitization

###Don't leak stack traces

##Cross Site Request Forgery

###Samy the Myspace Worm
[Watch: MySpace hacker and author of Samy worm speaks out](https://www.youtube.com/watch?v=nC0i81eMLb8)

##Password Phishing
https://openphish.com/

##Encrypt Sensitive Data

###Don't use Math.random( )

##SSL/TLS/HTTPS

###Heartbleed
