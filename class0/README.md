#Getting Ready for Olin.js

##Ubuntu
[Startup Guide with recommended settings etc.]

##Node
[Pull PPA instructions from https://github.com/joyent/node/wiki/installing-node.js-via-package-manager]

##Github
We are going to be using git for homework submission and many other things in this course. The way this will work is that you will fork this git repo into your own account and then you will push your homework to that repository when you finish it.

To start out you will need a Github account. Either log in or create a new one at https://github.com.

If you don't have git on your computer already, it can be installed with:
```sh
sudo apt-get install git
```

Lastly, ensure you are setup to use SSH to communicate with Github. SSH is a communication protocol that ensures secure transfer of information while preventing you from needing to enter your username and password to push. Follow [this guide]((https://help.github.com/articles/generating-ssh-keys/) if you need any help. 

### 1. Forking

"Forking" is to copy a repository. It's termed "forking" because you copy the entire history of the project, but from here on out, any changes you make to your new repository are distinct from those you make in the original repository. It's totally fine to keep two repositories ongoing with the same history, it's just data! 

Github makes this very easy. Do this:

![http://i.imgur.com/AnpW5Bx.png](http://i.imgur.com/AnpW5Bx.png)

This will bring you to your own copy of this lesson. When you make changes to your version, it won't mess with anyone else's work.

### 2. Cloning 
Now that you have your own copy of the repository, it's time to "clone" it, aka, download a copy to your computer. It's termed "cloning" because your downloaded copy and the version that exists on Github have a special relationship: you can "push", aka upload, all of your changes to the server with a single command. Cloned repositories exist to push and be pushed.

We want to clone your copy of this lesson's repository. Replace the `_____` in the below example with your Github username. If you get an ssh error, refer here https://help.github.com/articles/generating-ssh-keys/ 

```sh
cd ~ # go to your home directory
git clone git@github.com:____/olinjs.git
```

###3. Adding a remote to the original
The last thing is to create the remote back to the original repository. This will allow you to pull additions to add to the original repository into your own repository without overriding any of your work. To add a remote:

```sh
cd ~/olinjs # go to your newly cloned repository
git remote add upstream git@github.com:olinjs/olinjs.git
```

###4. Pulling from upstream
To pull any new additions from the upstream remote, simply run
```sh
git pull upstream master
```
If everything is going according to plan, there shouldn't be any conflicts, but if there are, you will have to resolve them. 

##Pre-course survey
[Make and link here, include url of forked repository and github username in survey]