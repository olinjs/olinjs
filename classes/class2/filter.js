function getShortMessages(messages) {
      return messages.map(function(x){return x.message}).filter(function(mess){
      	return (mess.length < 50)
      })
    }
    
    module.exports = getShortMessages