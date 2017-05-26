## Table of Contents

<!-- MarkdownTOC -->

- [Lesson 10 - Deployment and Scaling](#lesson-10---deployment-and-scaling)
  - [Deployment](#deployment)
  - [Scaling](#scaling)
- [Lesson 10 - In-Class Exercises](#lesson-10---in-class-exercises)
- [Before Class 11 \(Tuesday 2/28/17\)](#before-class-11-tuesday-22817)

<!-- /MarkdownTOC -->


# Lesson 10 - Deployment and Scaling

Once your applications are ready you will need a way to share them with the world.
There is more to consider than just running your app on a remote server with its own URL.
But what happens when your application gets super popular and needs to handle millions of requests per day?
Production applications need to be able to be easily *deployed*, to ensure they run in a good *environment*,
to allow them to *scale* to meet demand, and to make sure they are always accessible even in the case of natural disaster.

## Deployment

In this class, we'll be deploying our apps on Heroku.
Heroku is far from the only deployment solution, though.
It’s great for small projects (like the ones we’ve been doing) because it’s free, but if your app starts getting a lot of traffic, Heroku may no longer be the best choice.

### Environments
The first step to deployment is setting up the various environments in which your application will live.
You have a pretty stable development environment setup on your own computer, but when you host on another server,
you need to recreate that same environment remotely. Heroku has a basic setup for us that can support Node, Ruby,
or Python applications, but as we move on to other platforms, we’ll need to install all that software ourselves.

Further, you’ll want to think about the environment beyond just the software stack, but include permissions, test components, as well as database isolation.
A typical setup for a large application is to have every developer have their own local copy of the application to work on and test,
a staging server which is used for QA testing your master branch before moving on to your production servers.
Each of these environments should have their own databases so that one of your developers doesn’t accidentally delete everything in production, or some error in stage does something similar.

### Continuous Integration

  >Continuous integration (CI) is the practice, in software engineering, of merging all developer working copies with a shared mainline several times a day...
  The main aim of CI is to prevent integration problems, referred to as "integration hell"...
  CI was originally intended to be used in combination with automated unit tests written through the practices of test-driven development…
  Later elaborations of the concept introduced build servers, which automatically run the unit tests periodically or even after every commit and report the results to the developers.

*--Wikipedia*

One popular service for continuous integration is Travis-CI.
You can set Travis to run your unit tests when you submit a pull request.
Integrating with Github will even let you see the status of your testing and warn you if a test failed.
![CI](./images/ci.png)

### DevOps
You might have heard of the term DevOps before, but not known what it was.
DevOps is the name for the method of handling all of your deployment and integration and it is expansive.
Many large companies will dedicate large teams to 24hr monitoring and maintenance of CI and deployment.
There are a multitude of companies whose entire existence is to create tools and even programming languages specifically for helping devops teams automate their jobs.

## Scaling
When our applications are serving lots of people, a single web server will no longer cut it.
Even a server running two 8 core processors with 128 GB of RAM, terabytes of storage and the fastest internet connection
available will still be unable to handle the types of load that many of our favorite sites see on their slowest day of activity.
So then what do we do? We run multiple servers! All modern hosting services (Amazon Web Services, Google Cloud, Microsoft Azure,
Digital Ocean, plus many others that we don’t know) will offer “auto-scaling” to some degree. They will let you define algorithms like:
“When this group of servers are above a 60% average CPU or Network load, add 50% more servers”.
You’ll also have to scale down to prevent paying for unused servers (“If this group of servers is below 20% load for 5 minutes, remove 50% of the servers”).

### Pre-emptive Scaling
You might not only want to scale as a result of experiencing heavy load.
For example, you’re launching a redesign or a new product and are expecting to make a big splash on Reddit, or Hacker News.
There are some reasons you may want to override your auto-scaling settings and increase your server count temporarily.
Make sure you’re on top of your publicity and site usage to ensure your site doesn’t slow to a crawl right when you are at the peak of your popularity.

### Load Balancing
If you are running multiple servers, how do you control which server your users send requests to when they go to http://www.example.com?
We’ll manage this with a method called load balancing.
A central load balancing server takes in all the requests for your application and redistributes the requests across all of your application servers.
The load balancer will often monitor the status of your servers and smartly redirect new requests to servers with less load.
This may sound a bit complicated, but again, hosting services will help you set up a load balancer with just a few clicks.

### Distributed Servers
But what happens to your site when an earthquake finally knocks out all of Google’s servers in California? Fear not!
Hosting services will offer physically distributed server farms and usually guarantee that at least one location will be online at all times unless we are invaded by aliens.
So yeah, distribute your site geographically especially if your site sells survival guides for natural disasters.

### Distributed Databases
Just as you scale your web server to handle more requests, you will likely also want to scale your database servers.
After all, if you add more web servers, but not databases, your reads and writes will become a major bottleneck for you application.
Restful web apps scale nicely because they don’t keep track of any state or data. Databases on the other hand do keep track of data.
So we need to do some fancy things. One way to do this is to consider that a database read is much more common than a database write.
A common strategy is what’s called having read-replicas. We have a bunch of databases that will only be read from and a single database that we write to.
On some interval, we will copy the last n-seconds worth of writes to all of the read databases to sync them up.

### Distributed Computing
Sometimes your application might rely upon heavy computation, or you’ll want to do analytics across a distributed system.
There are many popular software packages for general purpose distributed computing via map/reduce http://en.wikipedia.org/wiki/MapReduce,
either through Hadoop, or built in to other software tools. Newer types of distributed computing are starting to become popular,
especially in real-time applications with frameworks like Storm, which allows you to stream process data across a distributed system.

https://storm.apache.org/

http://hadoop.apache.org/

### Hosting Services
Here are a bunch of services offered by Amazon:
![AWS](./images/aws_services.png)

# Lesson 10 - In-Class Exercises

### Deploy to Heroku
**We do actually want to check that you completed this exercise. When you're done deploying your app, fill out [this survey](https://goo.gl/forms/GEMxtLlRw8wtJXEO2)**

Deploying your app allows you to share it with other Internet users. So far you've been accessing your apps at `localhost:PORT` -- which is great for development purposes, but not so great for sharing your app. Once you deploy an app, you'll be able to access it at a `something.herokuapp.com` URL (where `something` is the name you give your app during the deployment process).

**Before deploying your app, move it _out_ of your main Git repository into its own folder and run `git init` in the new folder! Deploying to Heroku requires your app directory to be a git repository, and nesting git repositories within git repositories gets kind of tricky.**

Sign up for a free Heroku account and work through the following two tutorials to deploy one of the apps you've written. 
- [Intro to Heroku deployment](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- [Adding a Remote MongoLab Database](https://devcenter.heroku.com/articles/mongolab)

# Before Class 11 (Tuesday 2/28/17)
### Catch Up & Synthesize
- Keep working on anything which is still in progress (we're here to help) 
- Look back through what you've learned so far and synthesize or review however is useful to you

### Deploy to Heroku
If you didn't finish [deploying an app to Heroku](#deploy-to-heroku) in class, please do so before next class. Feel free to ask us for help by email or Slack if you have any questions!