// function checkUsersValid(goodUsers) {
//   return function (submittedUsers) {
//   	return submittedUsers.every(function (goodUser){
//   		return goodUser.some(function (submittedUser){
//   			submittedUser.id === goodUser.id;
//   		});
//   	});
// }

var idMatch = function(goodUser) {
  return goodUser.id === submittedUser.id;
};

var one  = function(submittedUser) {
  return goodUsers.some(idMatch);
};

module.exports = function checkUsersValid(goodUsers) {
  return function(submittedUsers) {
    return submittedUsers.every(one);
  };
};

// function checkUsersValid(goodUsers) {
// 	var storedUsers = [];

// 	for (i = 0; i<goodUsers.length; i++) {
// 		storedUsers.push(goodUsers[i].id);
// 	}

//   return function (submittedUsers) {

//   	function isInStored(element, index, array) {
//   		return storedUsers.indexOf(element.id) > -1;
// 		};

//   	return submittedUsers.every(isInStored);
//   };
// };

// module.exports = checkUsersValid;
