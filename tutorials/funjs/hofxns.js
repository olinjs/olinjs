function repeat(operation, num) {
  for (var i = num; i >= 1; i--) {
      operation()
  };
}

// Do not remove the line below
module.exports = repeat
