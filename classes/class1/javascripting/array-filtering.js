var numbers = [1,2,3,4,5,6,7,8,9,10]

function evenNumbers (n) {
	return (n%2 === 0)
}

filtered = numbers.filter(evenNumbers)

console.log(filtered)
