const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
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

// This is the Second game where the user guesses the computer's number
async function start() {
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
      await start(); // recursive loop to repeat
    }
    process.exit(); 
    
  }

  // For resetting the variables
function variablesReset() {
    
    numTries = 0;
    rangeMin = 1;
    rangeMax = 100;
  }

// Global Variables
let gameOn = true;
let numTries = 0;
let prompt = "\n --> ";
let rangeMax = 100;
let rangeMin = 1;

start();



