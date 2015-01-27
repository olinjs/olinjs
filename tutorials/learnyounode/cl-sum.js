// Functions
function canBeInteger(val){
    var midpt = parseInt(val);
    return (midpt==midpt)};

var inputarr = process.argv;
var ints = inputarr.filter(canBeInteger);
var total = 0;

for(var i in ints)  { total += Number(ints[i]); }
console.log(total);
