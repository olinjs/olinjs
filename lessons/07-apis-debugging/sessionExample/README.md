#Session Example App

This is an example app using the express-session library to manage sessions. To run the example first run
```
npm install
```
then run 
```
node index.js
```
finally open up a browser and head to localhost:3000. You should be redirected to /login with a simple text field and submit button. When you submit a name the app will redirect to the home page with "Hello [name]" displayed along with the date the cookie expires. The cookie should expire in a minute from when the post request is made. After a minute, an alert will appear and the page will redirect to /login after the alert is cleared. 