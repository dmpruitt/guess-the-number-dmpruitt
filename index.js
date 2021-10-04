const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Menu for user to select game
async function chooseGame() {
  gameChoice = await ask(
    ` Welcome! \n Which game would you like to play? \n [1.] Computer guesses your number \n [2.] You guess the computer's number \n [X] Press X key to exit. ${prompt}`
  );
  while (
    gameChoice.toLowerCase() !== "x" &&
    gameChoice.toLowerCase() !== "2" &&
    gameChoice.toLowerCase() !== "1"
  ) {
    gameChoice = await ask(
      ` \n Oops! Let's try this again \n Which game would you like to play? \n [1.] Computer guesses your number \n [2.] You guess the computer's number \n [X] Press X key to exit. ${prompt}`
    );
  }
}

//This is the First game where the computer guesses the user's number.
async function game1() {
  await rangeUser(); // user sets the range
  //console.log(rangeMax); // debug check
  let random = randomNum(rangeMin, rangeMax); //assigns the random guess to a variable
  let guess = random;
  let answer = "a";
  numTries += 1;

  while (correct === false) {
    //console.log(numTries);
    //answer = await ask(` Is your number ${guess}? \n \[Y\] or \[N\] ${prompt}`);
    //numTries += 1;
    while (
      answer[0].toLowerCase !== "h" ||
      answer[0].toLowerCase !== "l" ||
      answer[0].toLowerCase !== "y"
    ) {
      answer = await ask(
        `My guess is ${guess}. \n Is this correct? \[Y\] \n or is your number \[H\]igher or \[L\]ower? ${prompt}`
      );
      console.log(numTries);

      // THIS CHEATER CHECK DOES NOT WORK YET

      // if (answer[0].toLowerCase === 'h' && guess > rangeMax) {
      //   console.log(
      //     ` Your answer of ${answer} is out of the range specified. \n We don't tolerate cheaters up in these parts! `
      //   );
      //   correct === true;
      //   process.exit();
      // } else

      if (answer[0].toLowerCase() === "y") {
        correct = true;
        console.log(`Your number was ${guess}!`);
        console.log(`This took ${numTries} tries.`);
        correct === true;
        break;
      } else if (answer[0].toLowerCase() === "h") {
        rangeMin = guess + 1;
        guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
        //console.log(answer);
        numTries += 1; //increments number of tries
        //console.log(numTries);
      } else {
        rangeMax = guess - 1;
        guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
        //console.log(answer);
        numTries += 1; //increments number of tries
        //console.log(numTries);
      }
    }
    console.log(numTries);
  }

  variablesReset(); // resetting the variables
  await playAgain(); // play again?
  if (gameOn === true) {
    await game1();
  }
}

// This is the Second game where the user guesses the computer's number
async function game2() {
  await rangeUser(); // user sets the range
  //console.log(rangeMax); // debug check

  let target = randomNum(rangeMin, rangeMax);
  let userGuess = 0;

  while (userGuess !== target) {
    userGuess = await ask(
      ` What is your guess at my number? \n It is from ${rangeMin} to ${rangeMax}. ${prompt}`
    );
    userGuess = parseFloat(userGuess);
    numTries += 1;
    //console.log(userGuess); // check

    if (isNaN(userGuess) || userGuess < rangeMin || userGuess > rangeMax) {
      console.log(
        ` Your answer of ${userGuess} is out of the range specified. \n We don't tolerate cheaters up in these parts! `
      );
      break;
    } else if (userGuess === target) {
      console.log(
        ` Great job! You guessed my number of ${target}! \n You took ${numTries} tries to find the answer.`
      );
    } else if (userGuess > target) {
      console.log(` Your entry of ${userGuess} was too High.`);
      rangeMax = userGuess - 1;
    } else {
      console.log(` Your entry of ${userGuess} was too Low.`);
      rangeMin = userGuess + 1;
    }
  }

  variablesReset(); // resetting the variables
  await playAgain(); // play again?

  if (gameOn === true) {
    await game2(); // recursive loop to repeat
  }
}

// Asks if player wants to go again, makes gameOn to true if yes
async function playAgain() {
  let again = "a"; // initialize
  while (again !== "y" && again !== "n") {
    again = await ask(
      ` Would you like to play again? \n \[Y\] or \[N\] ${prompt}`
    );
    again = again.toLowerCase();
  }
  if (again === "y") {
    gameOn = true;
  } else {
    gameOn = false;
  }
  variablesReset(); // resetting the variables
}

// Random number generator
function randomNum(min, max) {
  let range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

// function rangeAdjust(higherLower, guess) {
//   if (higherLower[0].toLowerCase() === "h") {
//     rangeMin = guess + 1;
//     guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
//     //console.log(higherLower);
//     numTries += 1; //increments number of tries
//     //console.log(numTries);
//   } else {
//     rangeMax = guess - 1;
//     guess = Math.floor((rangeMax - rangeMin) / 2 + rangeMin);
//     //console.log(higherLower);
//     numTries += 1; //increments number of tries
//     //console.log(numTries);
//   }
// }

// asking user what the maximum range should be
async function rangeUser() {
  rangeMax = await ask(
    ` What would you like the highest number to be? \n Please enter a whole number greater than 1.${prompt}`
  );
  rangeMax = parseFloat(rangeMax);
  while (isNaN(rangeMax) || rangeMax <= 1) {
    // Check for Null or out of range ( <=1 )
    rangeMax = await ask(
      ` Oops! Let's try this again. \n Please enter a whole number greater than 1. ${prompt}`
    );
    rangeMax = parseFloat(rangeMax);
  } // End of Range input
}

// For resetting the variables
function variablesReset() {
  correct = false;
  numTries = 0;
  rangeMin = 1;
  rangeMax = 100;
}

// Global Variables
let correct = false;
let gameChoice = "0";
let gameOn = true;
let numTries = 0;
let prompt = "\n --> ";
let rangeMax = 100;
let rangeMin = 1;

// Main Program
async function start() {
  await chooseGame(); // Main Menu - Asks user which game they would like to play

  if (gameChoice === "1") {
    // Play game 1
    await game1();
  } else if (gameChoice === "2") {
    // Play game 2
    await game2();
  } else if (gameChoice === "x") {
    console.log("Goodbye!");
    process.exit();
  }

  if (gameOn !== true) {
    await start();
  }
}

start();
