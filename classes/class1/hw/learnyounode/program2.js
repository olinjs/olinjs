var total = 0;
var x = process.argv;

for (i=2; i< x.length; i++){
   total += Number(x[i]);    
}
	
console.log(total);	