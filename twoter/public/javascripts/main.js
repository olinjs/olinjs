var onError = function(err,status){
  console.log("status",status);
  console.log("error",err);
}

$("#twote-out").submit(function(event){
  event.preventDefault();
  var myTwote = $("#twote-out").find("[name='addTwote']").val();
  var myUser = $(".loggedas").attr('name')
  var user_id = $(".loggedas").attr("id")
  $.post("postTwote",{
    twote: myTwote,
    user: myUser,
    user_id: user_id,
  }).done(function(data){
    var div = "<div id='"+data._id+"'div><div class='"+data.user_id+"'><p>"+data.text+"--"+data.user+"</p></div><input class='delete-button' id='"+data._id+"' type='button' value='Delete'></div>";
    $('#allTwotes').prepend(div);
  }).error(onError)
});

$("div").on("click",".delete-button",function(){
  var tweetid=$(this).attr("id");
  var userid=$(this).prev().attr("class");
  console.log(tweetid);
  console.log(userid);
  $.post("deleteTwote",{
    user_id: userid,
    twote_id: tweetid,
  }).done(function(data){
    $("div").remove("#"+tweetid);
  }).error(onError)
});

$("div").on('click','.userTag', function(){
  var userId = $(this).attr("id")

  $( "."+userId ).each(function() {
    if (this.style.backgroundColor!=="yellow"){
      this.style.backgroundColor = "yellow";
    } else {
      this.style.backgroundColor = "";
    }
  });
  $( "#"+userId+".userTag" ).each(function() {
    if (this.style.backgroundColor!=="yellow"){
      this.style.backgroundColor = "yellow";
    } else {
      this.style.backgroundColor = "";
    }
  });
})
