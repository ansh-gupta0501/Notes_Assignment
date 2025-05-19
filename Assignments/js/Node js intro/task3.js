// 3. Create a script that generates a random number.

console.log(Math.random() );


// random Integer Between a Specific Range (e.g., 1 to 100)

function randomNumberBetweenSpecificRange(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumber = randomNumberBetweenSpecificRange(5,100)
console.log(randomNumber)