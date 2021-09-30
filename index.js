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
  let rangeLow = 1;
  let rangeHigh = 100;
  let guess = randomNum(rangeLow, rangeHigh); //assigns the random guess to a variable
  let correct = false;

  while (correct === false) {
    let answer = await ask(`Is your number ${guess}?`);

    if (answer[0].toLowerCase() === "y") {
      console.log(`Your number was ${guess}!`); //checks to see if first letter of response is a 'y'
      correct = true;
    } else {
      answer = await ask("Is the number higher or lower?");
      if (answer[0]toLowerCase() === "h"){
        rangeHigh = answer;
console.log((rangeHigh - rangeLow)/2 + rangeLow)

      }
    }
  }
  process.exit();
}
