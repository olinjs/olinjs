//process is a global object with property argv,
//an array returning the contents of the command
//line
var start = 2;
var arrToAdd = process.argv;
var end = arrToAdd.length;
var total = 0;

for (i=start;i<end;i++){
	//total+= +arrToAdd[i];
	total+= Number(arrToAdd[i]);
}
console.log(total);

