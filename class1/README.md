#Class 1

##Goals: 
- You should understand course plan and resources
- Development environments ready
- Fundamentals of Node and JavaScript

##Homework Due Link:
* [Class 0 - Getting Ready for the Course](../class0/README.md)

##Welcome to OlinJS! 
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

This is obviously a comic misconception about the true nature of the internet, so lets dive deeper and have a look at the true nature of our old friend. 

###Browser
Browsers are a form of connection to the internet that we are all very familiar with. They serve as a very user friendly way to make a **request** to various servers around the world and then display the **response** to those requests. The browser is one example of a **client**, which is something that sends requests to a **server**. HTTP is simply a mutually agreed upon protocol that clients and servers can use to communicate effectively between one another. 

![Request response diagram](http://docstore.mik.ua/orelly/weblinux2/modperl/figs/pmp_0101.gif)
##Server Structure
The server's job is to be constantly listening for incomming connections, accept those connections, do some processing, and send back a response. The task of elegantly accepting connections, processing them, and sending a response can be a large and complex. Luckily, there are many excellent existing and open-source frameworks for us to choose from to do much of the work for us. There are also additional integration challenges, such as connecting to databases, that we can make significantly easier by using other frameworks. Throughout the last few decades, several different combinations of these frameworks have been popular and whichever combination you choose to use is called your **Server Stack**. Some such popular server stacks get cute names such as LAMP (Linux, Apache, MySQL, and PHP) and MEAN (MongoDB, Express, Angular, and Node). Throughout this course we will, as the name suggests, be focusing on implementing server architectures that utilize Node.js, which forms the backbone of the server. 

##Javascript
Many of you are likely familiar with Javascript, but don't worry if you aren't. Javascript, despite what the name suggests, has almost no connection to Java. It is the only actual programming language that runs within your browser itself. syntactically, it is probably one of the more *loose* programming languages and looks similar to python. It was originally designed for being used for quick, small, lightweight tasks within browsers and has since grown into its own language. Only in relatively recent years has javascript, personal computers, and browsers gotten good enough to safely be able to run more serious Javascript code. In fact, javascript started out as a very slow language and has gone through rapid iterations of improvements lately. We (and every modern browser) will use ES5, a modern release of javascript with some useful language additions. It is a scripted language (meaning it executes line by line rather than compiling the whole program first) and has a relatively unique object-oriented implementation. You will get to hear A LOT more about Javascript in the coming weeks, so we will leave it here for now. 
##Node
Acording to the official website Node.js is:
"Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices." 

What this really means is that it is Javascript running on the server, accepting incoming requests and handling them. The thing that makes Node.js so awesome, is that it is entirely **non-blocking**. To understand exactly what this means, realize that with other server frameworks, when a request comes in, the server has to process that request and send the response before it can accept the next incoming request. Node is structured in such a way that when a request comes in, it can immediately continue listening for other requests. 

##Homework for next class:
The homework for next class will be to go through an introductory tutorial on Node. To get to the tutorial, run these commands from your terminal:
```sh
$ sudo npm install learnyounode -g
$ learnyounode
```
If you are interested the git repo for this tutorial can be found here: https://github.com/rvagg/learnyounode, though you should not have need of it. 
