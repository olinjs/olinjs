var comLine = process.argv;
var sum = 0;

for (var i=2; i<comLine.length; i++) {
  sum += Number(comLine[i]);
}

console.log(sum);
