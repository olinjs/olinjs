

// Multiples of 3 and 5

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var arrMultiplos = [];

arr.map(function(num){
  if(num % 3 === 0){
   arrMultiplos.push(num);
  // return console.log(arrMultiplos);
  } else if (num % 5 === 0){
   arrMultiplos.push(num);
  }
 return arrMultiplos; 
 }
);


console.log('Los multiplos de 3 & 5 en ' + arr + ' son ' + arrMultiplos);





