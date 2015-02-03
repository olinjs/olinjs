function sum(array) {
    var total = 0;
    for (var i = 2; i < array.length; i++) {
        total += +array[i];
    }

    return total;
}

console.log(sum(process.argv))