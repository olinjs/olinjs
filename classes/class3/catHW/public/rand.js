function randInt(length) {
  return Math.floor(Math.random()*length);
}

function subArray(colors_list) {
  var length = colors_list.length;
  var colors = [];

  for (var i=0; i<length; i++) {
    if (Math.random()>0.7) {
      colors.push(colors_list[i]);
    }
  }
  if (!colors.length) {
    colors.push(colors_list[Math.floor(Math.random()*length)]);
  }
  return colors;
}

module.exports.randInt = randInt;
module.exports.subArray = subArray;