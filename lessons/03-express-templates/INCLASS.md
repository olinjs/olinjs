##In-class Exercises
1. Follow along with the tutorial in the [readme](https://github.com/olinjs/olinjs/tree/lesson-3-links/lessons/03-express-templates) to create a web app that uses Express and Handlebars to display a list of classes at Olin that you're currently taking and the professors who teach them. Your finished product should display something like the paragraph below in a browser:
   
    - Aaron teaches POE
    - Allen teaches Signals and Systems
    - Mark teaches Markanics
   
   Build off of the hello world application you did for homework and make sure that
   you use Handlebars. You will have to extend and slightly change the code
   provided in the lesson 3 readme to build this app. Instead of giving Handlebars a list of
   Strings, you'll want to hand off a list of Objects to Handlebars. These objects
   will contain Strings specifying the name of the class and the teacher, like so:
   
   ```javascript
       res.render("home", {"classes": [
         {name:"Olin.js", teacher:"Me"},
         {name:"other class 1", teacher:"A baboon"},
         {name:"other class 2", teacher:"A sentient rock"}]
       });
   ```
   
   Then in Handlebars you can access the values stored in the object using this.name or this.teacher. For example, to display a list of teachers while complimenting them, we might write the folowing code:
   
   ```javascript
       <ul>
       {{#each classes}}
         <li>{{this.teacher}} is the best!</li>
       {{/each}}
       </ul>
   ```
   
   Once you've completed the exercise, show the teaching team your web app in a browser.

2. There is a lot of repetitive setup and repeated code, called boilerplate code, involved when you create a new web app. Copy the files of the application you created for the exercise above into a new directory. Name this new directory 'boilerplate' and make sure that you'll be able to easily find it later on. Congratulations, now you have code that you can copy and paste to quickly begin building a new web app. This way, you can avoid tedious repetitive setup in the future. You may modify this boilerplate as you wish, simplifying and cutting out code, but it's pretty bare-bones already. Generating code and setting up projects automatically is such a common thing that tools like express-generate (mentioned in the class readme) and yeoman exist to do this. Those tools generate more code than you'll need right now, making it harder to understand what's going on, so we don't recommend that you use them just yet.

3. For this last exercise, you will be replicating one of the most sophisticated and powerful web apps the internet has ever seen: [https://isitchristmas.com/](https://isitchristmas.com).There are a few requirements, of course.
  - Your website should use Handlebars and change to tell the user YES or NO depending on whether it is Christmas.
  - The website title and favicon (what displays at the top of a tab in chrome) should be appropriately Christmassy. Do some googling first if you need help with the favicon!
  - You don’t need to worry about timezones for now. Assume that everyone using this website is in the same timezone as your server.  
  - If you finish early, try your hand at these exercises:
    - Make sure that the response you send your user is centered, no matter how they resize their browser.
    - Send along some javascript so an animation of your choice occurs when you click on the page. For example, the text on the page could change to a random color when you click on it.  
