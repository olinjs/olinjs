#Class 1

##Goals
After this class, you should:
- Understand the course plan and resources
- Have your development environments ready
- Be familiar with the fundamentals of Node and JavaScript

##Homework Due
* [Class 0 - Getting Ready for the Course](../class0/README.md)

##Welcome to Olin.js!
We are excited to have you in this class and look forward to a great semester of learning Node.js together. To start off, here is your teaching team:

- Ben Kahle
- Evan Dorsky
- Evan Simpson
- Thomas Nattestad

Helping us this semester with Ninja duties are:
- Joshe Langowitz
- Sarah Walters

##Introduction to the Internet:
![Series of tubes](http://crackerdiet.net/pub/Tedstevenstubesomgwhat.jpg)

This is obviously a comic misconception about the true nature of the internet, so let's dive deeper and have a look at the true nature of our old friend.

###TCP/IP
The underlying backbone of what we call the internet is the **Internet Protocol**, also known as **IP**. Under IP, every device that connects to the network through a router or gateway is assigned an **IP address** by the router or gateway it connects to. When one device wants to connect to another over the internet, it simply needs to know its address and it can use that to request a connection on a specific **port** over IP. For all intents and purposes, think of a port as a numbered slot on a computer that can host multiple IP connections. Most devices have ports numbered 1-65535 with some sections reserved.

With a connection established, the devices can start sending arbitrary data to each other. In order to ensure that all of the data is transmitted correctly and in order, we use the **Transmission Control Protocol**, or **TCP**. TCP on the sender's side takes care of organizing data into packets, numbering them, and sending them out over IP. On the receiver's side, as packets come in, they are put in order and checked for any missing data. If there's a packet missing, the receiver will ask the sender to send another copy until it has all of the packets.

Together TCP/IP is known as the Internet Protocol Suite. There are many other protocols that you can use to communicate over the internet, but this suite is the backbone of most connections, and as we'll see, HTTP. That's about all you'll need to know about TCP/IP for this class, so let's pay close attention to this next section which will be much more relevant throughout the semester.

###HTTP
The **HyperText Transfer Protocol** (**HTTP**) is the popular protocol used for exchanging resources - like web pages, images, and even raw data - over the web. Yes, it's yet another protocol and it lays out the format of data to be sent out over TCP. HTTP is designed for a **client-server** architecture, in which a client makes a **request** to a server, to which the server sends a **response** (yes, these are technical terms, that's why they're **bolded**). Requests and responses have a simple plaintext format that is divided into a **header** section, and a **body** section.

#####HTTP Requests
To understand an HTTP request, let's see what one looks like!

```
    GET /wiki/List_of_HTTP_header_fields HTTP/1.1
    Host: en.wikipedia.org:80
    Connection: keep-alive
    Cache-Control: max-age=0
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
    Referer: https://www.google.com/
    Accept-Encoding: gzip, deflate, sdch
    Accept-Language: en-US,en;q=0.8
```

Now at first it might look a bit intimidating, but if we read through it carefully, we'll see there's nothing to be afraid of. Let's start at the top.

```
GET /wiki/List_of_HTTP_header_fields HTTP/1.1
```

This line actually tells us 3 things. 1) We want to `GET` the resource located at the URL 2) `/wiki/List_of_HTTP_header_fields`, and we are expecting this transaction to use 3) version 1.1 of the HTTP protocol. The next line is the start of the **field-value** part of the header. As an example, the first field-value pair,

```
Host: en.wikipedia.org:80
```

is required under version 1.1 and tells the server the domain name and port number it is expecting to connect to. This is important for scenarios where a single server can be running multiple VMs, each supporting a different domain, and the hardware needs to know which VM to send the request to. One field you might recognize is the `User-Agent` field, which tells the server the application that is making the request.

```
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
```

Even though this request was made by Chrome, you might notice that there are a number of different browser names hidden in there. The reason for that is a [long story](http://webaim.org/blog/user-agent-string-history/) so just read the [short summary](http://stackoverflow.com/questions/1114254/why-mozilla-string-is-present-on-all-browsers-user-agent).

The rest of the field-values are there to give special instructions to the server in the event that it needs that extra information. You won't really care about that stuff for a while, and when you need to know about it you'll be able to look it up pretty easily. (Hint: The above request is for a page that lists [common HTTP headers](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields).)

Sometimes a client will want to send data to a server (submit a form, upload a file), and in that case we'll use a `POST` or `PUT` request instead of `GET`. For those requests, rather than send additional data in the header, it gets sent in the body. This particular request doesn't have a body, but we can see how it would work by looking at the response to this request.

#####HTTP Responses
Following is the response generated by Wikipedia after receiving the above request.

```
    HTTP/1.1 200 OK
    Server: Apache
    X-Content-Type-Options: nosniff
    Content-language: en
    Content-Encoding: gzip
    Vary: Accept-Encoding,Cookie
    X-Powered-By: HHVM/3.3.1
    Last-Modified: Thu, 08 Jan 2015 12:24:09 GMT
    Content-Type: text/html; charset=UTF-8
    Content-Length: 23650
    Accept-Ranges: bytes
    Age: 56536
    Connection: keep-alive
    Cache-Control: private, s-maxage=0, max-age=0, must-revalidate

    <!DOCTYPE html>
    <html lang="en" dir="ltr" class="client-nojs">
    .
    .
    .
    </html>
```

You'll notice the format is similar to the request, but with a few noticeable differences. First, we notice the first line

```
HTTP/1.1 200 OK
```

now leads with the HTTP version number, and is followed by a number. This number is known as a status code. `200 OK` means everything went OK. There are a [whole bunch of different status codes](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes), but you're probably most familiar with [`404 NOT FOUND`](https://github.com/404), maybe `500 INTERNAL SERVER ERROR`, and you didn't realize it until now - `200 OK`. Don't bother memorizing them all right now. We'll help you figure out when certain ones are appropriate in the future.

The next difference you'll notice is that most of the headers are different. That's just the server giving us some metadata about the resource we requested. The two you should pay particular attention to are

```
Content-Type: text/html; charset=UTF-8
Content-Length: 23650
```

which tell us that there is a body to this response, it is text meant to be interpreted as html, and it is 23650 bytes long (with UTF-8 that means 23650 characters). After the header section there is a single blank line followed by those 23650 bytes of content.

So that's the basics of HTTP - just simple formatted text. Now let's look at how we interact with servers over the internet.

###Browser
Browsers are a form of internet client that we are all familiar with. They serve as a very user-friendly way to make requests to various servers around the world and then display the html responses. When we type a URL into a browser and press enter the browser looks up the IP address associated with the user-friendly domain name like "facebook.com", and starts the IP connection. It then builds a request from a standard set of headers and sends it off to the server. When it gets some HTML as a response, it renders it.

![Request response diagram](http://docstore.mik.ua/orelly/weblinux2/modperl/figs/pmp_0101.gif)

###Servers
The server's job is to constantly listen for incoming connections, accept those connections, parse requests, and send back responses. Elegantly handling all the responsibilities of a server is complex. Luckily, there are many excellent open-source frameworks for us to choose from to do much of the work for us. These frameworks will allow us to quickly and easily build applications in this class.

There are also additional integration challenges, such as connecting to databases, that we can make significantly easier by using other frameworks. Throughout the last few decades, several different combinations of these frameworks have become popular and whichever combination you choose to use is called your **Server Stack**. Some such popular server stacks get cute names such as LAMP (Linux, Apache, MySQL, and PHP) and MEAN (MongoDB, Express, Angular, and Node). Throughout this course we will, as the name suggests, be focusing on implementing server architectures that utilize Node.js, which forms the backbone of the server.

##JavaScript
Many of you are likely familiar with JavaScript, but don't worry if you aren't. JavaScript, despite what the name suggests, has no connection to Java. The language's name was changed from LiveScript to JavaScript to capitalize on the hot new browser, NetScape, adding support for the hot new web language, Java. In 1995.

Needless to say, JavaScript has been around for a long time.

It is the only actual programming language that runs within your browser itself. Syntactically, it is probably one of the more *loose* programming languages and looks similar to Python. It was originally designed for being used for quick, small, lightweight tasks within browsers and has since grown into its own language. Only in relatively recent years have JavaScript, personal computers, and browsers gotten good enough to safely be able to run more serious JavaScript code. In fact, JavaScript started out as a very slow language and has gone through rapid iterations of improvements lately.

We (and every modern browser) will use ES5, a modern release of JavaScript with some useful language additions. It is a scripted language (meaning it executes line by line rather than compiling the whole program first) and has a relatively unique object-oriented implementation. You will get to hear A LOT more about JavaScript in the coming weeks, so we will leave it here for now.
##Node
Acording to the official website,
>"Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."

What this really means is that it is JavaScript running on the server, accepting incoming requests and handling them. The thing that makes Node.js so awesome is that it is entirely **non-blocking**. To understand exactly what this means, realize that with other server frameworks, when a request comes in, the server has to process that request and send the response before it can accept the next incoming request. Node is structured in such a way that when a request comes in, it can immediately continue listening for other requests.

##Homework for next class:
The homework for next class will be to go through introductory tutorials on JavaScript and Node.

####JavaScript Tutorial

For details about the JavaScript tutorial, check out its [GitHub repo](https://github.com/sethvincent/javascripting).

To get to the tutorial, run these commands from your terminal:
```sh
$ sudo npm install -g javascripting
$ javascripting
```

####Node Tutorial

The Node tutorial process is similar.

[GitHub repo](https://github.com/rvagg/learnyounode)

```sh
$ sudo npm install learnyounode -g
$ learnyounode
```

###Turning in Homework

####[Homework completion survey](https://docs.google.com/forms/d/1VBVzpTce0jf731CFUQV46HAhVKffCtNuVFKL8Ba-yjs/viewform?usp=send_form)

When you've completed your homework, fill out the homework completion survey above.
