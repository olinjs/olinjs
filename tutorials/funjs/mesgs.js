function getShortMessages(messages) {
  var msgar = messages.filter(function(inob) {return inob.message < 50})

}

module.exports = getShortMessages
