var net = require('net')
// var strftime = require('strftime')

// console.log(strftime('%F %T', new Date(1307472705067))) // => 2011-06-07 18:51:45

var server = net.createServer(function (socket) {
      // socket handling logic
	var date = new Date()
	var str = date.getFullYear()+'-'+date.getMonth()+1 +'-'+date.getDate()+' '+date.getHours() +':0' +date.getMinutes()
	console.log(str)
	socket.end(str)

    })
    server.listen(process.argv[2])
