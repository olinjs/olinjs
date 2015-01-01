#Class 1

##Goals: 
- Students should understand course plan and resources
- Development environments ready
- Fundamentals of Node and JavaScript

##Homework Due:
For this first class you should:
- Have a working instance of linux (probably Ubuntu). Mac users will probably be able to get by with OS X. Note that we will officially be doing everything on Ubuntu.
- Have Node installed. Do this on Ubuntu using ```sudo apt-get install -y nodejs ``` and on Mac using homebrew  ```brew install node ```.
- Have a Github account working with ssh connection, NOT https. For a guide on ssh setup, refer here: https://help.github.com/articles/generating-ssh-keys/
- Fill out survey on what you want to get out of the class and your previous experience. The link to the survey is here [TODO]. 

##Welcome to OlinJS! 
We are excited to have you in this class and look forward to a great semester of learning Node.js together. To start off, here is your teaching team: 

- Ben Kahle
- Evan Dorsky
- Evan Simpson
- Thomas Nattestad

Helping us this semester with Ninja duties are:
- Joshe Langowitz
- Sarah Walters

##Syllabus
### Course Description:
Olin.js is a project oriented approach to learning modern web application development. With server and client technology advancing so rapidly, the modern website looks very different from that of even a few years ago, and will only become a bigger part of lives in the near future. Olin.js will quickly introduce and familiarize students with node.js as a web server framework and ES5 JavaScript as a responsive client-side language. Along the way students will learn the basic layout of the web, how to deploy and maintain large applications, important development strategies, skills, and technologies, and how to design and manage software projects. Students will conclude the course by putting their knowledge and skills to the test through developing their own web applications.

###Learning Objectives:
- Understand the modern internet and web applications 
- Become adept with JavaScript, Node, and database technologies
- Learn software design skills and strategies relevant to web infrastructure
- Work effectively as a member of a project team
- Balance scope and design decisions to complete a viable web application
- Communication and presentation of code and software projects

###Course Structure:
- 3 weeks of introduction to course material with homeworks
- 4 weeks of labs, teams of 2, working on ~1.5 week assignments, more abstract content in class
- 6 weeks of project work, teams of 4, in-depth tutorials and work time in class 

###Grading:
- 20% Homeworks
- 30% Labs
- 50% Project (Intermediate grading during design reviews)

###Course Topics:
- Web Development Overview (Client/Server, get/post, cookies, etc.)
- JavaScript (syntax/style)
- node (syntax/style/patterns)
- git (overview, commands, style)
- scrum/Agile development
- startup-style development style
- code management
- design/scalability
- AWS/GC/Heroku deployment
- Unit testing
- Security
- Data Streams/Sockets
- APIs
- Architecture
- Diagramming (UML, flow, etc.)
- Dependency Management
- Code Structure

##Introduction to the Internet:
![Series of tubes](http://crackerdiet.net/pub/Tedstevenstubesomgwhat.jpg)

This is obviously a comic misconception about the true nature of the internet, so lets dive deeper and have a look at the true nature of our old friend. 

###Browser
Browsers are a form of connection to the internet that we are all very familiar with. They serve as a very user friendly way to make a **request** to various servers around the world and then display the **response** to those requests. The browser is one example of a **client**, which is something that sends requests to a **server**. HTTP is simply a mutually agreed upon protocol that clients and servers can use to communicate effectively between one another. 

![Request response diagram](http://docstore.mik.ua/orelly/weblinux2/modperl/figs/pmp_0101.gif)
##Server Structure
The server's job is to be constantly listening for incomming connections, accept those connections, do some processing, and send back a response. The task of elegantly accepting connections, processing them, and sending a response can be a large and complex. Luckily, there are many excellent existing and open-source frameworks for us to choose from to do much of the work for us. There are also additional integration challenges, such as connecting to databases, that we can make significantly easier by using other frameworks. Throughout the last few decades, several different combinations of these frameworks have been popular and whichever combination you choose to use is called your **Server Stack**. Some such popular server stacks get cute names such as LAMP (Linux, Apache, MySQL, and PHP) and MEAN (MongoDB, Express, Angular, and Node). Throughout this course we will, as the name suggests, be focusing on implementing server architectures that utilize Node.js, which forms the backbone of the server. 

##Javascript
Many of you are likely familiar with Javascript, but don't worry if you aren't. Javascript, despite what the name suggests, has almost no connection to Java. It is the only actual programming language that runs within your browser itself. syntactically, it is probably one of the more *loose* programming languages and looks similar to python. It was originally designed for being used for quick, small, lightweight tasks within browsers and has since grown into its own language. Only in relatively recent years have personal computers and browsers gotten good enough to safely be able to run more serious Javascript code. It is a scripted language (meaning it executes line by line rather than compiling the whole program first) and has a relatively unique object-oriented implementation. You will get to hear A LOT more about Javascript in the coming weeks, so we will leave it here for now. 
##Node
Acording to the official website Node.js is:<br/>
"Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices." <br />
What this really means is that it is Javascript running on the server, accepting incoming requests and handling them. The thing that makes Node.js so awesome, is that it is entirely **non-blocking**. To understand exactly what this means, realize that with other server frameworks, when a request comes in, the server has to process that request and send the response before it can accept the next incoming request. Node is structured in such a way that when a request comes in, it can immediately continue listening for other requests. 
![Non-blocking diagram](http://thomashunter.name/wp-content/uploads/2012/07/Screen-Shot-2012-07-23-at-3.38.08-PM-640x475.png)