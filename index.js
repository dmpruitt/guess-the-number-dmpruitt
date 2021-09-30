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
  let rangeMin = 1;
  let rangeMax = 100;
  let random = randomNum(rangeMin, rangeMax); //assigns the random guess to a variable
  let guess = random;
  let correct = false;
  let answer = await ask(`Is your number ${guess}?`);
  let numTries = 1;
  console.log(numTries);

  while (correct === false) {
    console.log(numTries);

    if (answer[0].toLowerCase() === "y" || answer[0].toLowerCase() === "c") {
      console.log(`Your number was ${guess}!`); //checks to see if first letter of response is a 'y'
      console.log(`This took ${numTries} tries.`);
      correct = true;
    } else {
      answer = await ask(
        `My guess is ${guess}. \n Is your number \[H\]igher or \[L\]ower?`
      );
      numTries += 1; //increments number of tries
      console.log(numTries);
      if (answer[0].toLowerCase() === "h") {
        rangeMin = guess + 1;
        guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
        console.log(answer);
      } else {
        rangeMax = guess - 1;
        guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
        console.log(answer);
      }
    }
  }
  process.exit();
}
