#Passport.js Example App

This is an example app using passport for facebook login. 

## Setup Auth

The app requires an `auth.js` file to load the Facebook auth information from.  All it needs to do is export the information:

```
module.exports = {
    'FACEBOOK_APP_ID' : 'YOUR APP ID HERE',
    'FACEBOOK_APP_SECRET' : 'YOUR APP SECRET HERE',
    'FACEBOOK_CALLBACK_URL' : 'http://localhost:3000/auth/facebook/callback'
  }
```

To get your ID and App Secret, go to the [Facebook developers page](https://developers.facebook.com/) and go to "My Apps" -> "Add a New App".  Choose website, and enter a name for your app.  

Ignore the SDK step, and enter `localhost:3000` for the site URL.  

Then, if you click "Skip Quick Start" at the top of the page, it will direct you to your app dashboard.  

Select **Settings** from the sidebar menu and go to the **Advanced** tab.  

Scroll down to **Client OAuth Settings** and enable **Embedded Browser OAuth Login**.  In the box for **Valid OAuth redirect URIs**, enter `localhost:3000`.  Save changes

Go back to the main Dashboard, and copy your **App ID** and **App Secret** into your `auth.js` file.

## Run the App

To run the example run 
```
npm install
```
then run 
```
node passport_example.js
```
The app should now be running on localhost:3000. If you head there, you should see a link to login with facebook. After login, if you head to /user the user's information should be displayed. 
