const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Random number generator
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

start();

async function start() {
let guess = randomNum(1, 100); //assigns the random guess to a variable
  let answer = await ask(`Is your number ${guess}?`); 
if (answer[0].toLowerCase() === 'y') { //checks to see if first letter of response is a 'y'
  console.log(`Your number was ${guess}`)
}




  
  process.exit();  
}


