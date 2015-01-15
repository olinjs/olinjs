#Class 10 - Client-side Javascript Frameworks

##Intro
So far we have seen how to organize an increasingly complex system of components on our node server. We will now take a side step to discuss another organizational system in which instead of having lot of structure on the server, we have that structure on the client. 
##Basic Idea
In the traditional system, with every click there is a sending of html along with all the necessary assets. You have seen how this can work with templating by rendering html on the server and then sending it across. The image below shows this traditional system: 
![serverOrganizedSystem](https://lh6.googleusercontent.com/fBvc945clgW7ED_8F09746rm3ocKX1koc-J67cNT-ykbcPhels1BoTRjiwy5XWYQ7TqNU_8t9Gw=w2560-h1170)

But what if instead of having to load an entire HTML document, you simply send only the necessary pieces of data and then change the html using Javascript code. In this structure the server would serve only a few different assets and include an API that can be used to request the necessary data. In that case the communications would look like this: 
![ClientOrganizedSystem](https://drive.google.com/thumbnail?id=0B6DSMZw4pr2pWXp1c2U0RkpzTlE&authuser=0&v=1421282132107&sz=w2560-h1170)

This clearly has the benefit of almost certainly lowering the amount of data that is transferred between the server and the client, which also lowers the loading time when clicking on links. Another benefit of this application structure is that the API component can be used for many other purposes, such as mobile applications or even to other developers who want to expand on your websites functionality, as diagrammed below:
![UsesOfClientSide](https://drive.google.com/thumbnail?id=0B6DSMZw4pr2pY2taV1BRRmhmSkE&authuser=0&v=1421282132107&sz=w2560-h1170)

You may wonder why this is not how it has always been done. The simple answer to this is that it is only recently that Javascript, browsers, and computers have gotten good enough to reliably utilize these client-side frameworks. If you were going to do anything interesting, you had to do it on the server. In addition to this, there is always the presence of tastes and preferences. You will get to explore some of these strengths and weaknesses in the next lab assignment when you tackle one of these frameworks yourself. 
##Backbone

##Ember

##Angular

