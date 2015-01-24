function getShortMessages(messages) {
    return messages.filter(function (messObj, i , array) {
        return messObj.message.length < 50;
    }).map(function (obj) {return obj.message;});
}

module.exports = getShortMessages