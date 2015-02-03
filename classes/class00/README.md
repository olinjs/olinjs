#Getting Ready for Olin.js

##Ubuntu
If you need help install Ubuntu check out this [guide](https://gist.github.com/benkahle/892fdb2531c5f388296a) written specifically for Olin laptops. It also includes some other useful packages and tips if you are new to Ubuntu.

##Node
We will install node from a package repository which will give us automatic updates:
* `curl -sL https://deb.nodesource.com/setup | sudo bash -` (install curl with `sudo apt-get install curl` if needed)
* `sudo apt-get install -y nodejs`
* `sudo apt-get install -y build-essential` (needed for some npm packages)
* To test: `node --version` should return v0.10.35 and `npm --version` should return 2.1.17
* If your npm is not up-to-date run `sudo npm install -g npm`

##Github
We are going to be using git for homework submission and many other things in this course. The way this will work is that you will fork this git repo into your own account and then you will push your homework to that repository when you finish it.

To start out you will need a Github account. Either log in or create a new one at https://github.com.

If you don't have git on your computer already, it can be installed with:
```sh
sudo apt-get install git
```

Lastly, ensure you are setup to use SSH to communicate with Github. SSH is a communication protocol that ensures secure transfer of information while preventing you from needing to enter your username and password to push. Follow [this guide]((https://help.github.com/articles/generating-ssh-keys/) if you need any help. 

### 1. Forking

"Forking" makes your own personal copy of a repository. The term is "forking" because you copy the entire history of the project, but from here on out, any changes you make to your new repository are distinct from those made in the original repository. It's totally fine to keep two repositories ongoing with the same history, it's just data! 

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
Please fill out this [form](http://goo.gl/forms/4G0ZWM9Ezv) to help contribute to the direction of the course. 
