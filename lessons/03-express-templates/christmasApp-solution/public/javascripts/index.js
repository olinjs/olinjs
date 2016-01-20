function getRandomColor(){
  //code from http://www.paulirish.com/2009/random-hex-color-code-snippets/
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

//necessary to wait for dom content to load or else the
//getElementsByClassName function won't work correctly
document.addEventListener("DOMContentLoaded", function(event) { 

  var container = document.getElementsByClassName("container");

  container[0].addEventListener("click", function(){
    container[0].style.color = getRandomColor();
  });

});
