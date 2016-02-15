# Before Next Class

## Assignment

You're going to make Twitter! Not quite. But we're going to get closer than you think.

We're going to be a little more open-ended here, describing functionality and user experience rather than specific http endpoints.

### Requirements

A "twote" is a small piece of text written by a user. You can call it whatever you want, but probably not "tweet" for copyright reasons...

- The main page displays:
	- A list of all twotes, with the most recent at the top
		- Each twote displays text and the author
	- A form to post a twote (**Disabled or not visible if user is not logged in**)
		- Including a display of the logged-in user
	- A list of all users
		- Clicking on a user highlights that user's twotes
	- A logout button

- The login page has:
	- A form to log in
		- There is zero authentication! Just enter a username to log in as that user — the user will be created if it doesn't exist. This is clearly not secure, but it'll let us play around with user/session management before we dive into the world of authentication and security starting next class.

- A logged in user can:
	- Post a twote (the twote will appear at the top of the list without a page refresh)
	- Delete their twotes (a user can only delete their own twotes and only when logged in)
	- Logout (with the logout button)

- All actions happen without a page refresh! (Except for redirecting to/from the Login page)

You're also going to make your clone look something like this:

![Example](example.png)

Using CSS! Some big things you should emulate:

- The 2-column display of twotes and users
- Each twote appears on its own line
- Add styling to the form! Default forms are ugly
- Nice fonts (see [Google fonts](https://www.google.com/fonts))
- Try to follow principles from the reading

When you're done with this homework and the next ([Homework 7](https://github.com/olinjs/olinjs/blob/master/lessons/07-apis-debugging/HOMEWORK.md)), fill out the [Twoter homework survey](http://goo.gl/forms/u5MDLduyFz). The survey is your submission for Twoter with OAuth.

## Preclass Reading

Read the [Class 7 README](https://github.com/olinjs/olinjs/tree/master/lessons/07-apis-debugging) before next class
