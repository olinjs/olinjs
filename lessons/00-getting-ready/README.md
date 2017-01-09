#Getting Ready for Olin.js

##Ubuntu
If you need help installing Ubuntu check out this [guide](https://gist.github.com/benkahle/892fdb2531c5f388296a) written specifically for Olin laptops. It also includes some other useful packages and tips if you are new to Ubuntu.

If you'd rather use a virtual machine, a different distribution of Linux, or a Mac, you're welcome to -- just be aware that the teaching team is most prepared to support Ubuntu dual boots.

##Node
We recommend installing node using [NVM](https://github.com/creationix/nvm) (Node Version Manager). NVM is easy to use and will provide version management for node.

1. Install nvm via curl in your terminal:
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
2. Install node using NVM: `nvm install node`

##Github
We recommend you follow along on the course with your own version of this git repo. The way this will work is that you will fork this git repo into your own account and then you will push your work to that repository when you finish it.

###1. Setting up Git, Github, and SSH keys
To start out you will need a Github account. Either log in or create a new one at https://github.com.

If you don't have git on your computer already, it can be installed with:
```sh
sudo apt-get install git
```

Lastly, follow [this guide](https://help.github.com/articles/generating-ssh-keys/) to
set up SSH communication with Github. SSH is a communication protocol that ensures secure transfer of information but doesn't require you to enter your username and password every time you push.

###2. Forking

"Forking" makes your own personal copy of a repository. The term is "forking" because you copy the entire history of the project, but from here on out, any changes you make to your new repository are distinct from those made in the original repository. It's totally fine to keep two repositories ongoing with the same history, it's just data!

Github makes this very easy. Do this:

![http://i.imgur.com/AnpW5Bx.png](http://i.imgur.com/AnpW5Bx.png)

This will bring you to your own copy of this lesson. When you make changes to your version, it won't mess with anyone else's work.

###3. Cloning
Now that you have your own copy of the repository, it's time to "clone" it, aka, download a copy to your computer. It's termed "cloning" because your downloaded copy and the version that exists on Github have a special relationship: you can "push", aka upload, all of your changes to the server with a single command.

Now, clone your copy of the Olin.js repository. You might have cloned with the remote URL which starts with `https` before; this time, we're asking you to clone with the one which starts with `ssh`. This is why you set up SSH keys in step 1 -- you'll be able to push your work without entering your username and password.

Replace the `_____` in the example below with your Github username. If you get an ssh error, refer to [this guide](https://help.github.com/articles/generating-ssh-keys/).

```sh
cd ~ # go to your home directory
git clone git@github.com:____/olinjs.git
```

### 4. Adding a remote to the original
Now that you have a local copy, you need to add the original Olin.js repository as a remote. This will allow you to pull changes we make to the original repository into your own repository without overriding any of your work. To add a remote:

```sh
cd ~/olinjs # go to your newly cloned repository
git remote add upstream git@github.com:olinjs/olinjs.git
```

###5. Pulling from upstream
To pull any new additions from the upstream remote, simply run
```sh
git pull upstream master
```
If everything is going according to plan, there shouldn't be any conflicts, but if there are, you will have to resolve them.

##Git Best Practices

In the real world (and in this class), it's not good practice to commit directly to the `master` branch. If a real project is under version control, committing a bug to `master` could break live code. Usually, you'll work in a branch, test your code, then make a pull request to merge your work into the `master` branch.

Here's how to create a pull request:

1. Create a new branch on your `olinjs` repository.

  ```bash
  $ git checkout -b branchname
  ```

2. Commit something on the branch.
3. Follow [this procedure](https://help.github.com/articles/using-pull-requests/) to make a pull request from your new branch `branchname` into `master` on **your fork** of `olinjs/olinjs` on GitHub (NOT the original repository, please!).

It's common to use pull requests to conduct code reviews. Developers discuss the changes in the comment thread on the pull request, iterate, and merge the changes once the discussion resolves. Conveniently, the merge button on a pull request lets you know whether the merge will result in any merge conflicts.

If you'd like an example of how pull requests can be used in a development workflow, [here are all the closed pull requests for Apple's open-sourced Swift programming language](https://github.com/apple/swift/pulls?q=is%3Apr+is%3Aclosed).

## The Repo and `.gitignore`

This is the directory structure of the `olinjs` repo:

```bash
.
├── .git
├── .gitignore
├── README.md
├── lessons
├── finalproject
├── lab1
├── lab2

6 directories, 2 files
```

The `.gitignore` file lives in the root directory of the git repository. Each line is a pattern for a file to ignore -- for instance, `**/*.log` means that git will ignore all of the files in any subdirectory which have .log as a file extension.

###### .gitignore

```bash
# Logs
**/logs
**/*.log

# Runtime data
pids
**/*.pid
**/*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
**/lib-cov

# Coverage directory used by tools like istanbul
**/coverage

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
**/.grunt

# node-waf configuration
**/.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
**/build/Release

# Dependency folders
**/node_modules

# Debug log from npm
**/npm-debug.log

# For Mac users without global gitignore
# http://islegend.com/development/setting-global-gitignore-mac-windows/
**/.DS_Store
```

This is worth perusing but we won't cover it in detail now. Your `.gitignore` can be as simple as:

###### .gitignore

```bash
node_modules
```

Which will ignore the `node_modules` folder — standard for a Node repository.

### What will homework look like?
We'll spend the first five weeks of class on a series of topics which are central to web development, including JavaScript, Node and Express, databases, jQuery and Ajax, templating and CSS, APIs, clientside frameworks, and deployment and scaling.

For the three or four weeks after that, you'll work on labs in pairs, then you'll spend the rest of the semester on a team project.

Here's how homework will work for the first five weeks:

#### Assignment
After each class, you'll do an individual programming assignment related to the day's topic. You're welcome to discuss the assignments in groups, but *we think it's important that you write your own code*!

#### Preclass Reading and Exercise
After each class, you'll also do some reading to prepare for the next class. We've written README.md documents which introduce each topic. Instead of repeating all of the information in the README in a lecture, we want to enable you to start learning about the topic on your own! So, as part of the homework for each class, we'll always ask you to read the README for the *next* class, do the associated preclass exercise. The NINJAs will collect the preclass exercise at the beginning of class and give you a grade: either 1 (you made reasonable effort to understand the topic) or 0 (you didn't turn the exercise in, or you didn't make a reasonable effort). Although the preclass exercises don’t “count” much in your grade, we hope they'll help you get more out of class than you would if you skipped them!


### Before Class 1 (Tuesday 1/19/16)
#### Assignment
- Follow the instructions in [SETUP.md](https://github.com/olinjs/olinjs/blob/master/lessons/00-getting-ready/SETUP.md) to set up your development environment.

#### Preclass Reading and Exercise
- Read the [Class 1 README](https://github.com/olinjs/olinjs/blob/master/lessons/01-welcome-internet/README.md).
- Complete at least the first 10 levels (up through move2) of [this Git tutorial](http://pcottle.github.io/learnGitBranching) (fun fact: last summer Indico required their developers to complete this tutorial before starting work.) Send an email to [olinjs16@gmail.com](olinjs16@gmail.com) with the subject line "Preclass 1" and a couple sentences about a level you found particularly interesting or challenging. (If you don't find any of the first ten levels particularly interesting or challenging, pick a more advanced level to email us about).

