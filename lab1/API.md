##API routes and expected behaviors

###GET ./pages
return: a list of all pages in the form {title, _id}

###POST ./pages/new
expect: body contains object representing page of form {title, content, author, time_of_creation, id}
behavior: create a new page with the given data (minus the id parameter), or if the id is non-null, then update the page with the given id
return: OK message after new page is created

###GET ./pages/byid/:id
return: the content of the page with the given _id

###DELETE ./pages/byid/:id/delete
action: delete the page with the given _id
return: OK message after page has been deleted
